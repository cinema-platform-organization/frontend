import {
	useMutation,
	UseMutationOptions,
	useQuery,
	useQueryClient,
	UseQueryOptions,
} from "@tanstack/react-query";

import type { GetHallsResponse } from "../generated";
import {
	createHall,
	CreateHallFormValues,
	deleteHall,
	getHallById,
	getHallsByTheater,
	updateHall,
} from "../requests/hall";

export function useAdminHalls(
	theaterId: string | null,
	options?: Omit<
		UseQueryOptions<GetHallsResponse[]>,
		"queryKey" | "queryFn" | "enabled"
	>,
) {
	return useQuery({
		queryKey: ["admin halls", theaterId],
		queryFn: () => getHallsByTheater(theaterId as string),
		enabled: !!theaterId,
		...options,
	});
}

export function useAdminHall(
	id: string | null,
	options?: Omit<UseQueryOptions<GetHallsResponse>, "queryKey" | "queryFn">,
) {
	return useQuery({
		...options,
		queryKey: ["admin hall", id],
		queryFn: () => getHallById(id as string),
		enabled: !!id && (options?.enabled ?? true),
	});
}

export function useCreateHall(
	options?: Omit<
		UseMutationOptions<GetHallsResponse, unknown, CreateHallFormValues>,
		"mutationKey" | "mutationFn"
	>,
) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["create hall"],
		mutationFn: createHall,
		onSuccess: (data, ...rest) => {
			queryClient.invalidateQueries({
				queryKey: ["admin halls", data.theaterId],
			});
			options?.onSuccess?.(data, ...rest);
		},
		...options,
	});
}

export function useUpdateHall(
	theaterId: string,
	options?: Omit<
		UseMutationOptions<
			GetHallsResponse,
			unknown,
			{ id: string; values: { name?: string } }
		>,
		"mutationKey" | "mutationFn"
	>,
) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["update hall"],
		mutationFn: ({ id, values }) => updateHall(id, values),
		onSuccess: (...args) => {
			queryClient.invalidateQueries({
				queryKey: ["admin halls", theaterId],
			});
			options?.onSuccess?.(...args);
		},
		...options,
	});
}

export function useDeleteHall(
	theaterId: string,
	options?: Omit<
		UseMutationOptions<unknown, unknown, string>,
		"mutationKey" | "mutationFn"
	>,
) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["delete hall"],
		mutationFn: (id: string) => deleteHall(id),
		onSuccess: (...args) => {
			queryClient.invalidateQueries({
				queryKey: ["admin halls", theaterId],
			});
			options?.onSuccess?.(...args);
		},
		...options,
	});
}
