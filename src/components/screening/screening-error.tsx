import { FilmIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function ScreeningError() {
	return (
		<div className="flex min-h-[100vh] flex-col items-center justify-center px-6 text-center text-white">
			<div className="flex max-w-md flex-col items-center justify-center rounded-2xl bg-[#1A1C24] p-10 shadow-lg">
				<div className="mb-6 flex justify-center">
					<FilmIcon className="h-16 w-16 text-rose-600" />
				</div>

				<h1 className="mb-3 text-3xl font-bold">Screening Not Found</h1>

				<p className="mb-8 text-neutral-400">
					It looks like this screening no longer exists. It may have
					been deleted or you followed an invalid link.
				</p>

				<div className="flex gap-4">
					<Button size="lg">
						<Link href="/">Home</Link>
					</Button>

					<Button size="lg" variant="outline">
						<Link href="/schedule">Schedule</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
