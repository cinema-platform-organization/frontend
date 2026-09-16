"use client";

import Link from "next/link";

import { GetMoviesResponse } from "@/api/generated";
import { MovieCard } from "@/components/movie-card";
import { Pagination } from "@/components/ui/pagination";

import { Button } from "../ui/button";

interface Category {
	id: string;
	title: string;
	slug?: string;
	description?: string | null;
}

interface PaginationData {
	page: number;
	limit: number;
	total: number;
	totalPages: number;
}

interface MovieListProps {
	movies: GetMoviesResponse[];
	categories: Category[];
	activeCategory: string;
	pagination: PaginationData;
	searchParams: Record<string, string | undefined>;
}

export function MovieList({
	movies,
	categories,
	activeCategory,
	pagination,
	searchParams,
}: MovieListProps) {
	const allCategories = [
		{ id: "now", label: "Now Playing" },
		{ id: "soon", label: "Coming Soon" },
		...categories.map(c => {
			return { id: c.slug!, label: c.title };
		}),
	];

	return (
		<section className="bg-background pt-28 pb-20">
			<div className="mx-auto max-w-7xl px-6">
				<h1 className="mb-8 text-center text-5xl font-bold text-white">
					Movies
				</h1>

				<div className="mb-8 flex flex-wrap justify-center gap-3">
					{allCategories.map((category, index) => {
						return (
							<Button
								key={index}
								variant={
									activeCategory === category.id
										? "default"
										: "outline"
								}
								size="md"
							>
								<Link href={`/movies?category=${category.id}`}>
									{category.label}
								</Link>
							</Button>
						);
					})}
				</div>

				<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-6 lg:grid-cols-4 xl:grid-cols-6">
					{movies && movies.length > 0 ? (
						movies.map((movie, index) => {
							return (
								<MovieCard
									key={index}
									movie={movie}
									isShowReleaseDate={activeCategory !== "now"}
								/>
							);
						})
					) : (
						<div className="col-span-full text-center text-neutral-400">
							No movies found
						</div>
					)}
				</div>

				<Pagination
					currentPage={pagination.page}
					totalPages={pagination.totalPages}
					baseUrl="/movies"
					searchParams={searchParams}
				/>
			</div>
		</section>
	);
}
