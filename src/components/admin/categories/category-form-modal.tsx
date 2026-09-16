"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import type { GetCategoriesResponse } from "@/api/generated";
import { useCreateCategory, useUpdateCategory } from "@/api/hooks";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface CategoryFormModalProps {
	open: boolean;
	category: GetCategoriesResponse | null;
	onClose: () => void;
}

const categorySchema = z.object({
	title: z.string().min(1, "Title is required"),
	slug: z.string().optional(),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

export function CategoryFormModal({
	open,
	category,
	onClose,
}: CategoryFormModalProps) {
	const isEdit = !!category;

	const form = useForm<CategoryFormValues>({
		resolver: zodResolver(categorySchema),
		defaultValues: { title: "", slug: "" },
	});

	useEffect(() => {
		if (open) {
			form.reset({
				title: category?.title ?? "",
				slug: category?.slug ?? "",
			});
		}
	}, [open, category]);

	const { mutate: create, isPending: isCreating } = useCreateCategory({
		onSuccess: () => onClose(),
	});

	const { mutate: update, isPending: isUpdating } = useUpdateCategory({
		onSuccess: () => onClose(),
	});

	function onSubmit(values: CategoryFormValues) {
		if (isEdit && category) {
			update({ id: category.id, values });
		} else {
			create(values);
		}
	}

	return (
		<Dialog
			open={open}
			onClose={onClose}
			title={isEdit ? "Edit category" : "New category"}
		>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

				<div className="flex justify-end gap-2 pt-2">
					<Button type="button" variant="outline" onClick={onClose}>
						Cancel
					</Button>
					<Button type="submit" disabled={isCreating || isUpdating}>
						{isEdit ? "Save changes" : "Create category"}
					</Button>
				</div>
			</form>
		</Dialog>
	);
}
