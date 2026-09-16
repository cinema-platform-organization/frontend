import type { PaginatedBookingsResponse } from "../generated";
import { instance } from "../instance";

export async function getUserBookings(params?: {
	limit?: number;
	page?: number;
}) {
	return await instance
		.get<PaginatedBookingsResponse>("/bookings", {
			params,
		})
		.then(res => {
			return res.data;
		});
}
