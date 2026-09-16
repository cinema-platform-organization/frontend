import Link from "next/link";

import { MovieCard } from "../movie-card";
import { Button } from "../ui/button";

export function MovieGrid({ movies }: { movies: any[] }) {
	return (
		<section className="bg-background py-20">
			<div className="mx-auto max-w-7xl px-6">
				<div className="mb-14 text-center">
					<h2 className="text-foreground mb-3 text-4xl font-semibold">
						Now in Cinemas
					</h2>
					<p className="mx-auto max-w-2xl text-lg font-medium text-zinc-400">
						Watch new releases on the big screen right now
					</p>
				</div>

				<div className="grid grid-cols-6 gap-6">
					{movies.slice(0, 6).map((movie, index) => {
						return <MovieCard key={index} movie={movie} />;
					})}
				</div>

				<div className="mt-10 flex justify-center">
					<Button variant="secondary">
						<Link href="/movies">All Movies</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
