import { GetCategoriesResponse } from "../generated";
import { api, instance } from "../instance";

export interface CategoryFormValues {
	title: string;
	slug?: string;
}

export async function getAllCategories() {
	return await api
		.get<GetCategoriesResponse[]>("/categories")
		.then(response => {
			return response.data;
		});
}

export async function getCategoryById(id: string) {
	return await instance
		.get<GetCategoriesResponse>(`/categories/${id}`)
		.then(response => {
			return response.data;
		});
}

export async function createCategory(values: CategoryFormValues) {
	return await instance
		.post<GetCategoriesResponse>("/categories", values)
		.then(response => {
			return response.data;
		});
}

export async function updateCategory(
	id: string,
	values: Partial<CategoryFormValues>,
) {
	return await instance
		.patch<GetCategoriesResponse>(`/categories/${id}`, values)
		.then(response => {
			return response.data;
		});
}

export async function deleteCategory(id: string) {
	return await instance.delete(`/categories/${id}`).then(response => {
		return response.data;
	});
}
