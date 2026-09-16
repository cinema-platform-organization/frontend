import {
	useMutation,
	UseMutationOptions,
	useQuery,
	useQueryClient,
	UseQueryOptions,
} from "@tanstack/react-query";

import type { GetTheatersResponse } from "../generated";
import {
	createTheater,
	deleteTheater,
	getAllTheaters,
	getTheaterById,
	TheaterFormValues,
	updateTheater,
} from "../requests/theater";

export function useAdminTheaters(
	options?: Omit<
		UseQueryOptions<GetTheatersResponse[]>,
		"queryKey" | "queryFn"
	>,
) {
	return useQuery({
		queryKey: ["admin theaters"],
		queryFn: getAllTheaters,
		...options,
	});
}

export function useAdminTheater(
	id: string | null,
	options?: Omit<
		UseQueryOptions<GetTheatersResponse>,
		"queryKey" | "queryFn"
	>,
) {
	return useQuery({
		...options,
		queryKey: ["admin theater", id],
		queryFn: () => getTheaterById(id as string),
		enabled: !!id && (options?.enabled ?? true),
	});
}

export function useCreateTheater(
	options?: Omit<
		UseMutationOptions<GetTheatersResponse, unknown, TheaterFormValues>,
		"mutationKey" | "mutationFn"
	>,
) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["create theater"],
		mutationFn: createTheater,
		onSuccess: (...args) => {
			queryClient.invalidateQueries({ queryKey: ["admin theaters"] });
			options?.onSuccess?.(...args);
		},
		...options,
	});
}

export function useUpdateTheater(
	options?: Omit<
		UseMutationOptions<
			GetTheatersResponse,
			unknown,
			{ id: string; values: Partial<TheaterFormValues> }
		>,
		"mutationKey" | "mutationFn"
	>,
) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["update theater"],
		mutationFn: ({ id, values }) => updateTheater(id, values),
		onSuccess: (...args) => {
			queryClient.invalidateQueries({ queryKey: ["admin theaters"] });
			options?.onSuccess?.(...args);
		},
		...options,
	});
}

export function useDeleteTheater(
	options?: Omit<
		UseMutationOptions<unknown, unknown, string>,
		"mutationKey" | "mutationFn"
	>,
) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["delete theater"],
		mutationFn: (id: string) => deleteTheater(id),
		onSuccess: (...args) => {
			queryClient.invalidateQueries({ queryKey: ["admin theaters"] });
			options?.onSuccess?.(...args);
		},
		...options,
	});
}
