"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

import type { GetScreeningsResponse } from "@/api/generated";
import { useAdminTheaters } from "@/api/hooks";
import {
	useAdminScreenings,
	useDeleteScreening,
} from "@/api/hooks/useScreeningsAdmin";
import { ScreeningFormModal } from "@/components/admin/screenings/screening-form-modal";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Pagination } from "@/components/ui/pagination";

export default function AdminScreeningsPage() {
	const [theaterId, setTheaterId] = useState<string>("");
	const [page, setPage] = useState(1);

	const [formModal, setFormModal] = useState<{
		open: boolean;
		screening: GetScreeningsResponse | null;
	}>({ open: false, screening: null });
	const [deleteTarget, setDeleteTarget] =
		useState<GetScreeningsResponse | null>(null);

	const { data: theaters } = useAdminTheaters();
	const { data, isLoading } = useAdminScreenings({
		theaterId: theaterId || undefined,
		limit: 20,
		page,
	});
	const { mutate: deleteScreening } = useDeleteScreening();

	const columns: ColumnDef<GetScreeningsResponse, any>[] = [
		{
			accessorKey: "movie",
			header: "Movie",
			cell: ({ row }) => row.original.movie.title,
		},
		{
			accessorKey: "theater",
			header: "Theater",
			cell: ({ row }) => row.original.theater.name,
		},
		{
			accessorKey: "hall",
			header: "Hall",
			cell: ({ row }) => row.original.hall.name,
		},
		{
			accessorKey: "startAt",
			header: "Starts",
			cell: ({ row }) => row.original.startAt,
		},
		{
			accessorKey: "endAt",
			header: "Ends",
			cell: ({ row }) => row.original.endAt,
		},
		{
			id: "actions",
			header: "",
			cell: ({ row }) => (
				<div className="flex justify-end gap-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() =>
							setFormModal({
								open: true,
								screening: row.original,
							})
						}
					>
						Edit
					</Button>
					<Button
						variant="outline"
						size="sm"
						className="border-red-900/50 text-red-400 hover:bg-red-950/30"
						onClick={() => setDeleteTarget(row.original)}
					>
						Delete
					</Button>
				</div>
			),
		},
	];

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-semibold text-white">
					Screenings
				</h2>
				<Button
					onClick={() =>
						setFormModal({ open: true, screening: null })
					}
				>
					New screening
				</Button>
			</div>

			<div className="max-w-xs">
				<label className="mb-1.5 block text-sm font-medium text-neutral-300">
					Filter by theater
				</label>
				<select
					value={theaterId}
					onChange={e => {
						setTheaterId(e.target.value);
						setPage(1);
					}}
					className="focus:border-primary w-full rounded-lg border border-zinc-700 bg-[#1A1C24] px-3 py-2 text-sm text-white outline-none"
				>
					<option value="">All theaters</option>
					{theaters?.map(theater => (
						<option key={theater.id} value={theater.id}>
							{theater.name}
						</option>
					))}
				</select>
			</div>

			<DataTable
				columns={columns}
				data={data?.data ?? []}
				isLoading={isLoading}
				emptyMessage="No screenings found"
			/>

			{data && data.totalPages > 1 && (
				<div className="flex items-center justify-center gap-4">
					<Button
						variant="outline"
						size="sm"
						disabled={page <= 1}
						onClick={() => setPage(p => p - 1)}
					>
						Previous
					</Button>
					<span className="text-sm text-neutral-400">
						Page {data.page} of {data.totalPages}
					</span>
					<Button
						variant="outline"
						size="sm"
						disabled={page >= data.totalPages}
						onClick={() => setPage(p => p + 1)}
					>
						Next
					</Button>
				</div>
			)}

			<ScreeningFormModal
				open={formModal.open}
				screening={formModal.screening}
				onClose={() => setFormModal({ open: false, screening: null })}
			/>

			<AlertDialog
				open={!!deleteTarget}
				onClose={() => setDeleteTarget(null)}
				onConfirm={() => {
					if (deleteTarget) deleteScreening(deleteTarget.id);
				}}
				title="Delete screening"
				description="Are you sure you want to delete this screening? This fails if it already has bookings."
				confirmText="Delete"
				confirmVariant="danger"
			/>
		</div>
	);
}
