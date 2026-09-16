"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

import type { GetCategoriesResponse } from "@/api/generated";
import { useAdminCategories, useDeleteCategory } from "@/api/hooks";
import { CategoryFormModal } from "@/components/admin/categories/category-form-modal";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";

export default function AdminCategoriesPage() {
	const [formModal, setFormModal] = useState<{
		open: boolean;
		category: GetCategoriesResponse | null;
	}>({ open: false, category: null });
	const [deleteTarget, setDeleteTarget] =
		useState<GetCategoriesResponse | null>(null);

	const { data: categories, isLoading } = useAdminCategories();
	const { mutate: deleteCategory } = useDeleteCategory();

	const columns: ColumnDef<GetCategoriesResponse, any>[] = [
		{
			accessorKey: "title",
			header: "Title",
		},
		{
			accessorKey: "slug",
			header: "Slug",
			cell: ({ row }) => row.original.slug || "—",
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
							setFormModal({ open: true, category: row.original })
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
					Categories
				</h2>
				<Button
					onClick={() => setFormModal({ open: true, category: null })}
				>
					New category
				</Button>
			</div>

			<DataTable
				columns={columns}
				data={categories ?? []}
				isLoading={isLoading}
				emptyMessage="No categories yet"
			/>

			<CategoryFormModal
				open={formModal.open}
				category={formModal.category}
				onClose={() => setFormModal({ open: false, category: null })}
			/>

			<AlertDialog
				open={!!deleteTarget}
				onClose={() => setDeleteTarget(null)}
				onConfirm={() => {
					if (deleteTarget) deleteCategory(deleteTarget.id);
				}}
				title="Delete category"
				description={`Are you sure you want to delete "${deleteTarget?.title}"? This fails if any movies still use it.`}
				confirmText="Delete"
				confirmVariant="danger"
			/>
		</div>
	);
}
