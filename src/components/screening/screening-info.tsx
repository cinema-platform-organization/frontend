import { CalendarIcon, ClockIcon, FilmIcon, MapPinIcon } from "lucide-react";

import type { GetScreeningResponse } from "@/api/generated";
import { parseApiDate } from "@/lib/utils/to-iso";

const KYIV_DATE = new Intl.DateTimeFormat("en-GB", {
	day: "numeric",
	month: "long",
	timeZone: "Europe/Kyiv",
});

const KYIV_TIME = new Intl.DateTimeFormat("uk-UA", {
	hour: "2-digit",
	minute: "2-digit",
	hourCycle: "h23",
	timeZone: "Europe/Kyiv",
});

// startAt/endAt come from the API in UTC without a zone marker;
// parseApiDate reads them as UTC, the formatters show Kyiv time
function formatDate(dateString: string) {
	return KYIV_DATE.format(parseApiDate(dateString));
}

function formatTime(dateString: string) {
	return KYIV_TIME.format(parseApiDate(dateString));
}

function getDuration(start: string, end: string) {
	const startDate = parseApiDate(start);
	const endDate = parseApiDate(end);
	return Math.round((endDate.getTime() - startDate.getTime()) / 60000);
}

export function ScreeningInfo({
	screening,
}: {
	screening: GetScreeningResponse;
}) {
	const date = formatDate(screening.startAt);
	const timeStart = formatTime(screening.startAt);
	const timeEnd = formatTime(screening.endAt);
	const duration = getDuration(screening.startAt, screening.endAt);

	return (
		<div className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-transparent p-6 shadow-xl backdrop-blur-lg">
			<h1 className="mb-4 flex items-center gap-3 text-4xl font-bold text-white">
				{screening.movie.title}
			</h1>

			<div className="space-y-3 text-[15px] text-neutral-300">
				<div className="flex items-center gap-2">
					<MapPinIcon className="size-4 text-neutral-500" />
					<span>
						{screening.theater.name}, {screening.theater.address}
					</span>
				</div>

				<div className="flex items-center gap-2">
					<FilmIcon className="size-4 text-neutral-500" />
					<span>{screening.hall.name}</span>
				</div>

				<div className="flex items-center gap-2">
					<ClockIcon className="size-4 text-neutral-500" />
					<span>
						{date} at {timeStart}–{timeEnd} • {duration} mins
					</span>
				</div>
			</div>
		</div>
	);
}
