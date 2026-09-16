"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import type { GetMoviesResponse } from "@/api/generated";
import { useAdminMovie, useCreateMovie, useUpdateMovie } from "@/api/hooks";
import { useAdminCategories } from "@/api/hooks";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface MovieFormModalProps {
	open: boolean;
	movie: GetMoviesResponse | null;
	onClose: () => void;
}

const movieSchema = z.object({
	title: z.string().min(1, "Title is required"),
	slug: z.string().optional(),
	description: z.string().min(1, "Description is required"),
	duration: z.coerce.number().int().min(1, "Duration must be positive"),
	releaseYear: z.coerce.number().int().optional(),
	releaseDate: z.string().optional(),
	ratingAge: z.coerce.number().int().min(0).max(21).optional(),
	country: z.string().optional(),
	categoryId: z.string().optional(),
	poster: z.instanceof(File).optional(),
	banner: z.instanceof(File).optional(),
});

type MovieFormValues = z.infer<typeof movieSchema>;

export function MovieFormModal({ open, movie, onClose }: MovieFormModalProps) {
	const isEdit = !!movie;

	const { data: fullMovie } = useAdminMovie(movie?.id ?? null, {
		enabled: open && isEdit,
	});
	const { data: categories } = useAdminCategories();

	const queryClient = useQueryClient();

	const form = useForm<MovieFormValues>({
		resolver: zodResolver(movieSchema) as any,
		defaultValues: {
			title: "",
			slug: "",
			description: "",
			duration: 0,
		},
	});

	useEffect(() => {
		if (open && fullMovie) {
			form.reset({
				title: fullMovie.title,
				slug: fullMovie.slug ?? "",
				description: fullMovie.description,
				duration: fullMovie.duration,
				releaseYear: fullMovie.releaseYear,
				releaseDate: fullMovie.releaseDate?.slice(0, 10),
				ratingAge: fullMovie.ratingAge,
				country: fullMovie.country ?? "",
				categoryId: fullMovie.categoryId,
			});
		} else if (open && !isEdit) {
			form.reset({
				title: "",
				slug: "",
				description: "",
				duration: 0,
				releaseYear: undefined,
				releaseDate: "",
				ratingAge: undefined,
				country: "",
				categoryId: undefined,
			});
		}
	}, [open, fullMovie, isEdit]);

	const { mutate: create, isPending: isCreating } = useCreateMovie({
		onSuccess: () => {
			onClose();
		},
	});

	const { mutate: update, isPending: isUpdating } = useUpdateMovie({
		onSuccess: () => {
			onClose();
		},
	});

	function onSubmit(values: MovieFormValues) {
		if (isEdit && movie) {
			const { poster, banner, ...rest } = values;
			update({ id: movie.id, values: rest });
		} else {
			if (!values.poster) {
				form.setError("poster", { message: "Poster is required" });
				return;
			}
			create({ ...values, poster: values.poster });
		}
	}

	return (
		<Dialog
			open={open}
			onClose={onClose}
			title={isEdit ? "Edit movie" : "New movie"}
		>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="max-h-[70vh] space-y-4 overflow-y-auto pr-1"
			>
				<Input
					label="Title"
					error={form.formState.errors.title?.message}
					{...form.register("title")}
				/>

				<Input
					label="Slug"
					error={form.formState.errors.slug?.message}
					{...form.register("slug")}
				/>

				<div>
					<label className="mb-1.5 block text-sm font-medium text-neutral-300">
						Description
					</label>
					<textarea
						className="focus:border-primary w-full rounded-lg border border-zinc-700 bg-[#1A1C24] px-3 py-2 text-sm text-white outline-none"
						rows={4}
						{...form.register("description")}
					/>
					{form.formState.errors.description && (
						<p className="mt-1 text-xs text-red-500">
							{form.formState.errors.description.message}
						</p>
					)}
				</div>

				<div className="grid grid-cols-2 gap-4">
					<Input
						label="Duration (min)"
						type="number"
						error={form.formState.errors.duration?.message}
						{...form.register("duration")}
					/>
					<Input
						label="Rating age"
						type="number"
						error={form.formState.errors.ratingAge?.message}
						{...form.register("ratingAge")}
					/>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<Input
						label="Release year"
						type="number"
						error={form.formState.errors.releaseYear?.message}
						{...form.register("releaseYear")}
					/>
					<Input
						label="Release date"
						type="date"
						error={form.formState.errors.releaseDate?.message}
						{...form.register("releaseDate")}
					/>
				</div>

				<Input
					label="Country"
					error={form.formState.errors.country?.message}
					{...form.register("country")}
				/>

				<div>
					<label className="mb-1.5 block text-sm font-medium text-neutral-300">
						Category
					</label>
					<select
						className="focus:border-primary w-full rounded-lg border border-zinc-700 bg-[#1A1C24] px-3 py-2 text-sm text-white outline-none"
						{...form.register("categoryId")}
					>
						<option value="">No category</option>
						{categories?.map(category => (
							<option key={category.id} value={category.id}>
								{category.title}
							</option>
						))}
					</select>
				</div>

				{!isEdit && (
					<div>
						<label className="mb-1.5 block text-sm font-medium text-neutral-300">
							Poster
						</label>
						<input
							type="file"
							accept="image/*"
							onChange={e =>
								form.setValue("poster", e.target.files?.[0])
							}
							className="w-full text-sm text-neutral-400"
						/>
						{form.formState.errors.poster && (
							<p className="mt-1 text-xs text-red-500">
								{form.formState.errors.poster.message as string}
							</p>
						)}
					</div>
				)}

				{!isEdit && (
					<div>
						<label className="mb-1.5 block text-sm font-medium text-neutral-300">
							Banner (optional)
						</label>
						<input
							type="file"
							accept="image/*"
							onChange={e =>
								form.setValue("banner", e.target.files?.[0])
							}
							className="w-full text-sm text-neutral-400"
						/>
					</div>
				)}

				<div className="flex justify-end gap-2 pt-2">
					<Button type="button" variant="outline" onClick={onClose}>
						Cancel
					</Button>
					<Button type="submit" disabled={isCreating || isUpdating}>
						{isEdit ? "Save changes" : "Create movie"}
					</Button>
				</div>
			</form>
		</Dialog>
	);
}
