"use client";

import { useEffect, useState } from "react";

import type { GetScreeningsResponse } from "@/api/generated";
import { useAdminHalls, useAdminMovies, useAdminTheaters } from "@/api/hooks";
import {
	useCreateScreening,
	useUpdateScreening,
} from "@/api/hooks/useScreeningsAdmin";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";

interface ScreeningFormModalProps {
	open: boolean;
	screening: GetScreeningsResponse | null;
	onClose: () => void;
}

function toDatetimeLocal(value?: string) {
	if (!value) return "";
	return value.replace(" ", "T").slice(0, 16);
}

function fromDatetimeLocal(value: string) {
	return value.replace("T", " ") + ":00.000";
}

export function ScreeningFormModal({
	open,
	screening,
	onClose,
}: ScreeningFormModalProps) {
	const isEdit = !!screening;

	const [movieId, setMovieId] = useState("");
	const [theaterId, setTheaterId] = useState("");
	const [hallId, setHallId] = useState("");
	const [startAt, setStartAt] = useState("");
	const [endAt, setEndAt] = useState("");
	const [error, setError] = useState<string | null>(null);

	const { data: movies } = useAdminMovies({ limit: 100 }, { enabled: open });
	const { data: theaters } = useAdminTheaters();
	const { data: halls } = useAdminHalls(theaterId || null);

	useEffect(() => {
		if (open) {
			if (screening) {
				setMovieId(screening.movie.id);
				setTheaterId(screening.theater.id);
				setHallId(screening.hall.id);
				setStartAt(toDatetimeLocal(screening.startAt));
				setEndAt(toDatetimeLocal(screening.endAt));
			} else {
				setMovieId("");
				setTheaterId("");
				setHallId("");
				setStartAt("");
				setEndAt("");
			}
			setError(null);
		}
	}, [open, screening]);

	const { mutate: create, isPending: isCreating } = useCreateScreening({
		onSuccess: () => onClose(),
		onError: (err: any) => {
			setError(
				err?.response?.data?.message ?? "Failed to create screening",
			);
		},
	});

	const { mutate: update, isPending: isUpdating } = useUpdateScreening({
		onSuccess: () => onClose(),
		onError: (err: any) => {
			setError(
				err?.response?.data?.message ?? "Failed to update screening",
			);
		},
	});

	function handleSubmit() {
		if (!movieId || !hallId || !startAt || !endAt) {
			setError("All fields are required");
			return;
		}

		setError(null);

		const values = {
			movieId,
			hallId,
			startAt: fromDatetimeLocal(startAt),
			endAt: fromDatetimeLocal(endAt),
		};

		if (isEdit && screening) {
			update({ id: screening.id, values });
		} else {
			create(values);
		}
	}

	return (
		<Dialog
			open={open}
			onClose={onClose}
			title={isEdit ? "Edit screening" : "New screening"}
		>
			<div className="space-y-4">
				<div>
					<label className="mb-1.5 block text-sm font-medium text-neutral-300">
						Movie
					</label>
					<select
						value={movieId}
						onChange={e => setMovieId(e.target.value)}
						className="focus:border-primary w-full rounded-lg border border-zinc-700 bg-[#1A1C24] px-3 py-2 text-sm text-white outline-none"
					>
						<option value="">Select a movie</option>
						{movies?.data.map(movie => (
							<option key={movie.id} value={movie.id}>
								{movie.title}
							</option>
						))}
					</select>
				</div>

				<div>
					<label className="mb-1.5 block text-sm font-medium text-neutral-300">
						Theater
					</label>
					<select
						value={theaterId}
						onChange={e => {
							setTheaterId(e.target.value);
							setHallId("");
						}}
						className="focus:border-primary w-full rounded-lg border border-zinc-700 bg-[#1A1C24] px-3 py-2 text-sm text-white outline-none"
					>
						<option value="">Select a theater</option>
						{theaters?.map(theater => (
							<option key={theater.id} value={theater.id}>
								{theater.name}
							</option>
						))}
					</select>
				</div>

				<div>
					<label className="mb-1.5 block text-sm font-medium text-neutral-300">
						Hall
					</label>
					<select
						value={hallId}
						onChange={e => setHallId(e.target.value)}
						disabled={!theaterId}
						className="focus:border-primary w-full rounded-lg border border-zinc-700 bg-[#1A1C24] px-3 py-2 text-sm text-white outline-none disabled:opacity-50"
					>
						<option value="">Select a hall</option>
						{halls?.map(hall => (
							<option key={hall.id} value={hall.id}>
								{hall.name}
							</option>
						))}
					</select>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="mb-1.5 block text-sm font-medium text-neutral-300">
							Start
						</label>
						<input
							type="datetime-local"
							value={startAt}
							onChange={e => setStartAt(e.target.value)}
							className="focus:border-primary w-full rounded-lg border border-zinc-700 bg-[#1A1C24] px-3 py-2 text-sm text-white outline-none"
						/>
					</div>
					<div>
						<label className="mb-1.5 block text-sm font-medium text-neutral-300">
							End
						</label>
						<input
							type="datetime-local"
							value={endAt}
							onChange={e => setEndAt(e.target.value)}
							className="focus:border-primary w-full rounded-lg border border-zinc-700 bg-[#1A1C24] px-3 py-2 text-sm text-white outline-none"
						/>
					</div>
				</div>

				{error && <p className="text-sm text-red-500">{error}</p>}

				<div className="flex justify-end gap-2 pt-2">
					<Button type="button" variant="outline" onClick={onClose}>
						Cancel
					</Button>
					<Button
						onClick={handleSubmit}
						disabled={isCreating || isUpdating}
					>
						{isEdit ? "Save changes" : "Create screening"}
					</Button>
				</div>
			</div>
		</Dialog>
	);
}
