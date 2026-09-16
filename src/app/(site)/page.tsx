import { getAllMovies } from "@/api/requests";
import { HeroBanner } from "@/components/home/hero-banner";
import { MovieGrid } from "@/components/home/movie-grid";
import { toPaginatedResult } from "@/lib/utils/paginated";

export default async function HomePage() {
	const raw = await getAllMovies({
		category: "now",
		limit: 6,
		random: true,
	});

	const { items: movies, pagination } = toPaginatedResult(raw);

	const slides = [
		{
			id: "hollywood",
			title: "Hollywood Blockbusters",
			subtitle: "Top Premieres",
			description:
				"Immerse yourself in a world of high-profile premieres and thrilling stories.",
			banner: "hollywood-banner.webp",
			slug: "",
			isCustom: true,
		},
		{
			id: "racing",
			title: "Racing Hits",
			subtitle: "Retrospective of Speed",
			description:
				"From roaring engines to top speed — feel the adrenaline rush to the fullest!",
			banner: "racing-banner.webp",
			slug: "?category=racing",
			isCustom: true,
		},
		{
			id: "classic",
			title: "Cinema Classics",
			subtitle: "Legends of the Big Screen",
			description:
				"From cult dramas to timeless comedies — rewatch films that made history.",
			banner: "classic-cinema-banner.webp",
			slug: "?category=classic",
			isCustom: true,
		},
	];

	return (
		<div className="flex-1">
			<HeroBanner slides={slides} />
			<MovieGrid movies={movies} />
		</div>
	);
}
