import {
	useMutation,
	UseMutationOptions,
	useQuery,
	useQueryClient,
	UseQueryOptions,
} from "@tanstack/react-query";

import type {
	GetScreeningResponse,
	PaginatedScreeningsResponse,
} from "../generated";
import {
	createScreening,
	deleteScreening,
	getScreeningById,
	getScreeningsByDate,
	ScreeningFormValues,
	updateScreening,
} from "../requests/screening";

export function useAdminScreenings(
	params: {
		theaterId?: string;
		date?: string;
		limit?: number;
		page?: number;
	},
	options?: Omit<
		UseQueryOptions<PaginatedScreeningsResponse>,
		"queryKey" | "queryFn"
	>,
) {
	return useQuery({
		queryKey: ["admin screenings", params],
		queryFn: () => getScreeningsByDate(params),
		...options,
	});
}

export function useAdminScreening(
	id: string | null,
	options?: Omit<
		UseQueryOptions<GetScreeningResponse>,
		"queryKey" | "queryFn"
	>,
) {
	return useQuery({
		...options,
		queryKey: ["admin screening", id],
		queryFn: () => getScreeningById(id as string),
		enabled: !!id && (options?.enabled ?? true),
	});
}

export function useCreateScreening(
	options?: Omit<
		UseMutationOptions<GetScreeningResponse, unknown, ScreeningFormValues>,
		"mutationKey" | "mutationFn"
	>,
) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["create screening"],
		mutationFn: createScreening,
		onSuccess: (...args) => {
			queryClient.invalidateQueries({ queryKey: ["admin screenings"] });
			options?.onSuccess?.(...args);
		},
		...options,
	});
}

export function useUpdateScreening(
	options?: Omit<
		UseMutationOptions<
			GetScreeningResponse,
			unknown,
			{ id: string; values: Partial<ScreeningFormValues> }
		>,
		"mutationKey" | "mutationFn"
	>,
) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["update screening"],
		mutationFn: ({ id, values }) => updateScreening(id, values),
		onSuccess: (...args) => {
			queryClient.invalidateQueries({ queryKey: ["admin screenings"] });
			options?.onSuccess?.(...args);
		},
		...options,
	});
}

export function useDeleteScreening(
	options?: Omit<
		UseMutationOptions<unknown, unknown, string>,
		"mutationKey" | "mutationFn"
	>,
) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["delete screening"],
		mutationFn: (id: string) => deleteScreening(id),
		onSuccess: (...args) => {
			queryClient.invalidateQueries({ queryKey: ["admin screenings"] });
			options?.onSuccess?.(...args);
		},
		...options,
	});
}
