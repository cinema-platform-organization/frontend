import { GetTheatersResponse } from "../generated";
import { instance } from "../instance";

export interface TheaterFormValues {
	name: string;
	address: string;
}

export async function getAllTheaters() {
	return await instance
		.get<GetTheatersResponse[]>("/theaters")
		.then(response => response.data);
}

export async function getTheaterById(id: string) {
	return await instance
		.get<GetTheatersResponse>(`/theaters/${id}`)
		.then(response => response.data);
}

export async function createTheater(values: TheaterFormValues) {
	return await instance
		.post<GetTheatersResponse>("/theaters", values)
		.then(response => response.data);
}

export async function updateTheater(
	id: string,
	values: Partial<TheaterFormValues>,
) {
	return await instance
		.patch<GetTheatersResponse>(`/theaters/${id}`, values)
		.then(response => response.data);
}

export async function deleteTheater(id: string) {
	return await instance
		.delete(`/theaters/${id}`)
		.then(response => response.data);
}
