import {
	useMutation,
	UseMutationOptions,
	useQuery,
	useQueryClient,
	UseQueryOptions,
} from "@tanstack/react-query";

import type { GetCategoriesResponse } from "../generated";
import {
	CategoryFormValues,
	createCategory,
	deleteCategory,
	getAllCategories,
	updateCategory,
} from "../requests/category";

export function useAdminCategories(
	options?: Omit<
		UseQueryOptions<GetCategoriesResponse[]>,
		"queryKey" | "queryFn"
	>,
) {
	return useQuery({
		queryKey: ["admin categories"],
		queryFn: getAllCategories,
		...options,
	});
}

export function useCreateCategory(
	options?: Omit<
		UseMutationOptions<GetCategoriesResponse, unknown, CategoryFormValues>,
		"mutationKey" | "mutationFn"
	>,
) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["create category"],
		mutationFn: createCategory,
		onSuccess: (...args) => {
			queryClient.invalidateQueries({ queryKey: ["admin categories"] });
			options?.onSuccess?.(...args);
		},
		...options,
	});
}

export function useUpdateCategory(
	options?: Omit<
		UseMutationOptions<
			GetCategoriesResponse,
			unknown,
			{ id: string; values: Partial<CategoryFormValues> }
		>,
		"mutationKey" | "mutationFn"
	>,
) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["update category"],
		mutationFn: ({ id, values }) => updateCategory(id, values),
		onSuccess: (...args) => {
			queryClient.invalidateQueries({ queryKey: ["admin categories"] });
			options?.onSuccess?.(...args);
		},
		...options,
	});
}

export function useDeleteCategory(
	options?: Omit<
		UseMutationOptions<unknown, unknown, string>,
		"mutationKey" | "mutationFn"
	>,
) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["delete category"],
		mutationFn: (id: string) => deleteCategory(id),
		onSuccess: (...args) => {
			queryClient.invalidateQueries({ queryKey: ["admin categories"] });
			options?.onSuccess?.(...args);
		},
		...options,
	});
}
