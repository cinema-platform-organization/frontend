import { getScreeningById } from "@/api/requests";
import { getSeatsByHall } from "@/api/requests/seat";
import { Screening } from "@/components/screening";
import type { Seat } from "@/components/screening";
import { ScreeningError } from "@/components/screening/screening-error";

interface Props {
	params: Promise<{
		id: string;
	}>;
}

function rowLabel(row: number): string {
	let label = "";
	let n = row;
	while (n > 0) {
		const rem = (n - 1) % 26;
		label = String.fromCharCode(65 + rem) + label;
		n = Math.floor((n - 1) / 26);
	}
	return label;
}

export default async function ScreeningPage({ params }: Props) {
	const { id } = await params;

	try {
		const screening = await getScreeningById(id);
		const rawSeats = await getSeatsByHall(screening.hall.id, screening.id);

		const seats: Seat[] = rawSeats.map(s => ({
			...s,
			label: `${rowLabel(s.row)}${s.number}`,
		}));

		return <Screening screening={screening} seats={seats} />;
	} catch {
		return <ScreeningError />;
	}
}
