import { format } from "date-fns";
import type { Metadata } from "next";

import { getMovieBySlug, getMovieScreenings } from "@/api/requests";
import { MovieBanner } from "@/components/movies/single/movie-banner";
import { ScheduleSection } from "@/components/movies/single/schedule-section";
import { groupScreeningsByTheater, Theater } from "@/lib/utils";

type Props = {
	params: Promise<{ slug: string }>;
	searchParams: Promise<{ date?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;

	const movie = await getMovieBySlug(slug);

	return {
		title: movie.title,
		description: movie.description,
	};
}

export default async function MoviePage({ params, searchParams }: Props) {
	const { slug } = await params;
	const { date } = await searchParams;

	const todayStr = format(new Date(), "yyyy-MM-dd");
	const activeDate = date || todayStr;

	const movie = await getMovieBySlug(slug);

	const response = await getMovieScreenings(movie.id, {
		date: activeDate,
	});

	const screenings = response.data || [];
	const groupedByTheater: Theater[] = groupScreeningsByTheater(screenings);

	return (
		<div className="mx-auto max-w-7xl px-6 pt-20">
			<MovieBanner movie={movie} />
			{screenings && <ScheduleSection theaters={groupedByTheater} />}
		</div>
	);
}
