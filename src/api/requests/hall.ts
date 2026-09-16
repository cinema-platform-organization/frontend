import { GetHallsResponse } from "../generated";
import { instance } from "../instance";

export interface RowLayoutInput {
	row: number;
	columns: number;
	type: string;
	price: number;
}

export interface CreateHallFormValues {
	name: string;
	theaterId: string;
	layout: RowLayoutInput[];
}

export async function getHallsByTheater(theaterId: string) {
	return await instance
		.get<GetHallsResponse[]>("/halls", { params: { theaterId } })
		.then(response => response.data);
}

export async function getHallById(id: string) {
	return await instance
		.get<GetHallsResponse>(`/halls/${id}`)
		.then(response => response.data);
}

export async function createHall(values: CreateHallFormValues) {
	return await instance
		.post<GetHallsResponse>("/halls", values)
		.then(response => response.data);
}

export async function updateHall(id: string, values: { name?: string }) {
	return await instance
		.patch<GetHallsResponse>(`/halls/${id}`, values)
		.then(response => response.data);
}

export async function deleteHall(id: string) {
	return await instance
		.delete(`/halls/${id}`)
		.then(response => response.data);
}
