"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

import type { GetSeatsByHallResponse } from "@/api/generated";
import { useAdminHall } from "@/api/hooks";
import { useAdminSeats, useDeleteSeat } from "@/api/hooks";
import { SeatEditModal } from "@/components/admin/cinemas/seat-edit-modal";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { ROUTES } from "@/constants/routes";

export default function AdminSeatsPage() {
	const params = useParams<{ theaterId: string; hallId: string }>();
	const { theaterId, hallId } = params;

	const [editTarget, setEditTarget] = useState<GetSeatsByHallResponse | null>(
		null,
	);
	const [deleteTarget, setDeleteTarget] =
		useState<GetSeatsByHallResponse | null>(null);

	const { data: hall } = useAdminHall(hallId);
	const { data: seats, isLoading } = useAdminSeats(hallId);
	const { mutate: deleteSeat } = useDeleteSeat(hallId);

	const columns: ColumnDef<GetSeatsByHallResponse, any>[] = [
		{
			accessorKey: "row",
			header: "Row",
		},
		{
			accessorKey: "number",
			header: "Number",
		},
		{
			accessorKey: "type",
			header: "Type",
		},
		{
			accessorKey: "price",
			header: "Price",
		},
		{
			id: "actions",
			header: "",
			cell: ({ row }) => (
				<div className="flex justify-end gap-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => setEditTarget(row.original)}
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
			<div>
				<Link
					href={ROUTES.ADMIN.HALLS(theaterId)}
					className="text-sm text-neutral-400 hover:text-white"
				>
					← Halls
				</Link>
				<h2 className="mt-1 text-2xl font-semibold text-white">
					{hall?.name ?? "Seats"}
				</h2>
			</div>

			<DataTable
				columns={columns}
				data={seats ?? []}
				isLoading={isLoading}
				emptyMessage="No seats found"
			/>

			<SeatEditModal
				open={!!editTarget}
				seat={editTarget}
				hallId={hallId}
				onClose={() => setEditTarget(null)}
			/>

			<AlertDialog
				open={!!deleteTarget}
				onClose={() => setDeleteTarget(null)}
				onConfirm={() => {
					if (deleteTarget) deleteSeat(deleteTarget.id);
				}}
				title="Delete seat"
				description={`Are you sure you want to delete row ${deleteTarget?.row}, seat ${deleteTarget?.number}? This fails if the hall has upcoming screenings.`}
				confirmText="Delete"
				confirmVariant="danger"
			/>
		</div>
	);
}
