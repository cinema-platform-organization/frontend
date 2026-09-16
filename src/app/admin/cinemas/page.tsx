"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";

import type { GetTheatersResponse } from "@/api/generated";
import { useAdminTheaters, useDeleteTheater } from "@/api/hooks";
import { TheaterFormModal } from "@/components/admin/cinemas/theater-form-modal";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { ROUTES } from "@/constants/routes";

const linkStyles =
	"flex items-center justify-center rounded-full border-2 border-white/30 px-2 py-1 text-xs font-medium text-white transition-all duration-250 hover:scale-105 hover:border-white/70 active:scale-100";

export default function AdminCinemasPage() {
	const [formModal, setFormModal] = useState<{
		open: boolean;
		theater: GetTheatersResponse | null;
	}>({ open: false, theater: null });
	const [deleteTarget, setDeleteTarget] =
		useState<GetTheatersResponse | null>(null);

	const { data: theaters, isLoading } = useAdminTheaters();
	const { mutate: deleteTheater } = useDeleteTheater();

	const columns: ColumnDef<GetTheatersResponse, any>[] = [
		{
			accessorKey: "name",
			header: "Name",
		},
		{
			accessorKey: "address",
			header: "Address",
		},
		{
			id: "actions",
			header: "",
			cell: ({ row }) => (
				<div className="flex justify-end gap-2">
					<Link
						href={ROUTES.ADMIN.HALLS(row.original.id)}
						className={linkStyles}
					>
						Halls
					</Link>
					<Button
						variant="outline"
						size="sm"
						onClick={() =>
							setFormModal({ open: true, theater: row.original })
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
				<h2 className="text-2xl font-semibold text-white">Cinemas</h2>
				<Button
					onClick={() => setFormModal({ open: true, theater: null })}
				>
					New theater
				</Button>
			</div>

			<DataTable
				columns={columns}
				data={theaters ?? []}
				isLoading={isLoading}
				emptyMessage="No theaters yet"
			/>

			<TheaterFormModal
				open={formModal.open}
				theater={formModal.theater}
				onClose={() => setFormModal({ open: false, theater: null })}
			/>

			<AlertDialog
				open={!!deleteTarget}
				onClose={() => setDeleteTarget(null)}
				onConfirm={() => {
					if (deleteTarget) deleteTheater(deleteTarget.id);
				}}
				title="Delete theater"
				description={`Are you sure you want to delete "${deleteTarget?.name}"? This fails if any of its halls have upcoming screenings.`}
				confirmText="Delete"
				confirmVariant="danger"
			/>
		</div>
	);
}
