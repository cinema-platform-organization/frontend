"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import type { GetMoviesResponse } from "@/api/generated";
import { Button } from "@/components/ui/button";
import { formatReleaseDate } from "@/lib/utils";
import { getMediaSource } from "@/lib/utils/get-media-source";

interface MovieColumnsOptions {
	onEdit: (movie: GetMoviesResponse) => void;
	onEditImages: (movie: GetMoviesResponse) => void;
	onDelete: (movie: GetMoviesResponse) => void;
}

export function getMovieColumns({
	onEdit,
	onEditImages,
	onDelete,
}: MovieColumnsOptions): ColumnDef<GetMoviesResponse, any>[] {
	return [
		{
			accessorKey: "poster",
			header: "Poster",
			cell: ({ row }) => (
				<div className="relative h-16 w-11 overflow-hidden rounded bg-zinc-800">
					<Image
						src={getMediaSource(row.original.poster)}
						alt={row.original.title}
						fill
						className="object-cover"
					/>
				</div>
			),
		},
		{
			accessorKey: "title",
			header: "Title",
			cell: ({ row }) => (
				<div>
					<div className="font-medium">{row.original.title}</div>
					<div className="text-xs text-neutral-500">
						{row.original.slug}
					</div>
				</div>
			),
		},
		{
			accessorKey: "ratingAge",
			header: "Rating",
			cell: ({ row }) =>
				row.original.ratingAge != null
					? `${row.original.ratingAge}+`
					: "—",
		},
		{
			accessorKey: "releaseDate",
			header: "Release date",
			cell: ({ row }) =>
				row.original.releaseDate
					? formatReleaseDate(row.original.releaseDate)
					: "—",
		},
		{
			id: "actions",
			header: "",
			cell: ({ row }) => (
				<div className="flex justify-end gap-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => onEditImages(row.original)}
					>
						Images
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => onEdit(row.original)}
					>
						Edit
					</Button>
					<Button
						variant="outline"
						size="sm"
						className="border-red-900/50 text-red-400 hover:bg-red-950/30"
						onClick={() => onDelete(row.original)}
					>
						Delete
					</Button>
				</div>
			),
		},
	];
}
