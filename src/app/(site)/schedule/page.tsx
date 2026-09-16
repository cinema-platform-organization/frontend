import { addDays, format } from "date-fns";

import {
	GetScreeningResponse,
	PaginatedScreeningsResponse,
} from "@/api/generated";
import { getScreeningsByDate } from "@/api/requests";
import { DateSelector } from "@/components/schedule/date-selector";
import { ScheduleList } from "@/components/schedule/schedule-list";
import { toPaginatedResult } from "@/lib/utils/paginated";

const dates = Array.from({ length: 7 }).map((_, i) => addDays(new Date(), i));

function formatScreenings(response: GetScreeningResponse[]) {
	response.sort(
		(a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime(),
	);

	const theatersMap = response.reduce((acc: any, s) => {
		const tId = s.theater.id;
		if (!acc[tId])
			acc[tId] = {
				theater: s.theater,
				screenings: [],
			};

		acc[tId].screenings.push({
			id: s.id,
			movie: s.movie,
			time: new Date(s.startAt).toLocaleTimeString("en-GB", {
				hour: "2-digit",
				minute: "2-digit",
			}),
			hall: s.hall.name,
			format: "2D",
			price: `${s.seatTypes[0]?.price ?? 0} UAH`,
		});

		return acc;
	}, {});

	return Object.values(theatersMap);
}

interface SchedulePageProps {
	searchParams: Promise<{
		date?: string;
		theater?: string;
	}>;
}

export default async function SchedulePage({
	searchParams,
}: SchedulePageProps) {
	const resolvedSearchParams = await searchParams;

	const selectedDate = resolvedSearchParams.date
		? new Date(resolvedSearchParams.date)
		: new Date();
	const theaterId = resolvedSearchParams.theater;

	const formattedDate = format(selectedDate, "yyyy-MM-dd");

	const raw = await getScreeningsByDate({
		date: formattedDate,
		theaterId,
	});

	const { items: screenings, pagination } = toPaginatedResult(raw);

	const formattedSchedule = formatScreenings(screenings);

	return (
		<section className="bg-background min-h-screen pt-28 pb-20 text-white">
			<div className="mx-auto max-w-7xl px-6">
				<h1 className="mb-10 text-center text-5xl font-bold">
					Schedule
				</h1>

				<DateSelector selectedDate={selectedDate} />

				<ScheduleList schedule={formattedSchedule} />
			</div>
		</section>
	);
}
