"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

import type { GetHallsResponse } from "@/api/generated";
import { useAdminTheater } from "@/api/hooks";
import { useAdminHalls, useDeleteHall } from "@/api/hooks";
import { HallFormModal } from "@/components/admin/cinemas/hall-form-modal";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { ROUTES } from "@/constants/routes";

const linkStyles =
	"flex items-center justify-center rounded-full border-2 border-white/30 px-2 py-1 text-xs font-medium text-white transition-all duration-250 hover:scale-105 hover:border-white/70 active:scale-100";

export default function AdminHallsPage() {
	const params = useParams<{ theaterId: string }>();
	const theaterId = params.theaterId;

	const [formModal, setFormModal] = useState<{
		open: boolean;
		hall: GetHallsResponse | null;
	}>({ open: false, hall: null });
	const [deleteTarget, setDeleteTarget] = useState<GetHallsResponse | null>(
		null,
	);

	const { data: theater } = useAdminTheater(theaterId);
	const { data: halls, isLoading } = useAdminHalls(theaterId);
	const { mutate: deleteHall } = useDeleteHall(theaterId);

	const columns: ColumnDef<GetHallsResponse, any>[] = [
		{
			accessorKey: "name",
			header: "Name",
		},
		{
			id: "actions",
			header: "",
			cell: ({ row }) => (
				<div className="flex justify-end gap-2">
					<Link
						href={ROUTES.ADMIN.SEATS(theaterId, row.original.id)}
						className={linkStyles}
					>
						Seats
					</Link>
					<Button
						variant="outline"
						size="sm"
						onClick={() =>
							setFormModal({ open: true, hall: row.original })
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
			<div>
				<Link
					href={ROUTES.ADMIN.CINEMAS}
					className="text-sm text-neutral-400 hover:text-white"
				>
					← Cinemas
				</Link>
				<div className="mt-1 flex items-center justify-between">
					<h2 className="text-2xl font-semibold text-white">
						{theater?.name ?? "Halls"}
					</h2>
					<Button
						onClick={() => setFormModal({ open: true, hall: null })}
					>
						New hall
					</Button>
				</div>
			</div>

			<DataTable
				columns={columns}
				data={halls ?? []}
				isLoading={isLoading}
				emptyMessage="No halls yet"
			/>

			<HallFormModal
				open={formModal.open}
				theaterId={theaterId}
				hall={formModal.hall}
				onClose={() => setFormModal({ open: false, hall: null })}
			/>

			<AlertDialog
				open={!!deleteTarget}
				onClose={() => setDeleteTarget(null)}
				onConfirm={() => {
					if (deleteTarget) deleteHall(deleteTarget.id);
				}}
				title="Delete hall"
				description={`Are you sure you want to delete "${deleteTarget?.name}"? This fails if it has upcoming screenings.`}
				confirmText="Delete"
				confirmVariant="danger"
			/>
		</div>
	);
}
