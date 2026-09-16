import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import { type PaginatedResult, toPaginatedResult } from "@/lib/utils/paginated";

import type { PaginatedBookingsResponse } from "../generated";
import { getUserBookings } from "../requests";

type BookingItem = PaginatedBookingsResponse["data"][number];

export function useGetBookings(
	params?: { limit?: number; page?: number },
	options?: Omit<
		UseQueryOptions<
			PaginatedBookingsResponse,
			unknown,
			PaginatedResult<BookingItem>
		>,
		"queryKey" | "queryFn" | "select"
	>,
) {
	return useQuery({
		queryKey: ["get bookings", params],
		queryFn: () => getUserBookings(),
		select: raw => toPaginatedResult(raw),
		...options,
	});
}
