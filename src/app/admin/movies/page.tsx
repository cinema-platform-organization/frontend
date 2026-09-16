"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import type { GetMoviesResponse } from "@/api/generated";
import { useAdminMovies, useDeleteMovie } from "@/api/hooks";
import { getMovieColumns } from "@/components/admin/movies/columns";
import { MovieFormModal } from "@/components/admin/movies/movie-form-modal";
import { MovieImageModal } from "@/components/admin/movies/movie-image-modal";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Pagination } from "@/components/ui/pagination";

export default function AdminMoviesPage() {
	const searchParams = useSearchParams();
	const page = Number(searchParams.get("page") ?? "1") || 1;

	const [formModal, setFormModal] = useState<{
		open: boolean;
		movie: GetMoviesResponse | null;
	}>({ open: false, movie: null });
	const [imageModal, setImageModal] = useState<{
		open: boolean;
		movieId: string | null;
	}>({ open: false, movieId: null });
	const [deleteTarget, setDeleteTarget] = useState<GetMoviesResponse | null>(
		null,
	);

	const { data, isLoading } = useAdminMovies({ limit: 20, page });
	const { mutate: deleteMovie } = useDeleteMovie();

	const columns = getMovieColumns({
		onEdit: movie => setFormModal({ open: true, movie }),
		onEditImages: movie => setImageModal({ open: true, movieId: movie.id }),
		onDelete: movie => setDeleteTarget(movie),
	});

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-semibold text-white">Movies</h2>
				<Button
					onClick={() => setFormModal({ open: true, movie: null })}
				>
					New movie
				</Button>
			</div>

			<DataTable
				columns={columns}
				data={data?.data ?? []}
				isLoading={isLoading}
				emptyMessage="No movies yet"
			/>

			{data && (
				<Pagination
					currentPage={data.page}
					totalPages={data.totalPages}
					baseUrl="/admin/movies"
					searchParams={{}}
				/>
			)}

			<MovieFormModal
				open={formModal.open}
				movie={formModal.movie}
				onClose={() => setFormModal({ open: false, movie: null })}
			/>

			<MovieImageModal
				open={imageModal.open}
				movieId={imageModal.movieId}
				onClose={() => setImageModal({ open: false, movieId: null })}
			/>

			<AlertDialog
				open={!!deleteTarget}
				onClose={() => setDeleteTarget(null)}
				onConfirm={() => {
					if (deleteTarget) deleteMovie(deleteTarget.id);
				}}
				title="Delete movie"
				description={`Are you sure you want to delete "${deleteTarget?.title}"? This can't be undone.`}
				confirmText="Delete"
				confirmVariant="danger"
			/>
		</div>
	);
}
