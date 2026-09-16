import type { Metadata } from "next";

import { getAllCategories, getAllMovies } from "@/api/requests";
import { MovieList } from "@/components/movies/movie-list";
import { toPaginatedResult } from "@/lib/utils/paginated";

type Props = {
	searchParams: Promise<{ [key: string]: string | undefined }>;
};

export const metadata: Metadata = {
	title: "Movies",
};

export default async function MoviesPage({ searchParams }: Props) {
	const resolvedParams = await searchParams;
	const category = resolvedParams.category ?? "now";
	const page = Number(resolvedParams.page) || 1;

	const raw = await getAllMovies({
		category,
		page,
		limit: 10,
	});
	const categories = await getAllCategories();

	const { items: movies, pagination } = toPaginatedResult(raw);

	return (
		<MovieList
			movies={movies}
			categories={categories}
			activeCategory={category}
			pagination={pagination}
			searchParams={resolvedParams}
		/>
	);
}
