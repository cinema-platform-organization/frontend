import type {
	GetScreeningResponse,
	PaginatedScreeningsResponse,
} from "../generated";
import { api, instance } from "../instance";

export interface ScreeningFormValues {
	movieId: string;
	hallId: string;
	startAt: string;
	endAt: string;
}

export async function getScreeningsByDate(params: {
	theaterId?: string;
	date?: string;
	limit?: number;
	page?: number;
}) {
	return await api
		.get<PaginatedScreeningsResponse>(`/screenings`, {
			params,
		})
		.then(res => {
			return res.data;
		});
}

export async function getScreeningById(id: string) {
	return await api
		.get<GetScreeningResponse>(`/screenings/${id}`)
		.then(response => {
			return response.data;
		});
}

export async function getMovieScreenings(
	movieId: string,
	params?: { date?: string; limit?: number; page?: number },
) {
	return await api
		.get<PaginatedScreeningsResponse>(`/screenings/movie/${movieId}`, {
			params,
		})
		.then(response => {
			return response.data;
		});
}

export async function createScreening(values: ScreeningFormValues) {
	return await instance
		.post<GetScreeningResponse>("/screenings", values)
		.then(response => response.data);
}

export async function updateScreening(
	id: string,
	values: Partial<ScreeningFormValues>,
) {
	return await instance
		.patch<GetScreeningResponse>(`/screenings/${id}`, values)
		.then(response => response.data);
}

export async function deleteScreening(id: string) {
	return await instance
		.delete(`/screenings/${id}`)
		.then(response => response.data);
}
