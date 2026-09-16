import { GetSeatsByHallResponse } from "../generated";
import { instance } from "../instance";

export interface UpdateSeatFormValues {
	price?: number;
	type?: string;
}

export async function getSeatsByHall(hallId: string, screeningId?: string) {
	return await instance
		.get<GetSeatsByHallResponse[]>(`/seats/hall/${hallId}`, {
			params: screeningId ? { screeningId } : undefined,
		})
		.then(response => response.data);
}

export async function updateSeat(id: string, values: UpdateSeatFormValues) {
	return await instance
		.patch<GetSeatsByHallResponse>(`/seats/${id}`, values)
		.then(response => response.data);
}

export async function deleteSeat(id: string) {
	return await instance
		.delete(`/seats/${id}`)
		.then(response => response.data);
}
