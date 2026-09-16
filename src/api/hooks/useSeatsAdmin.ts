import {
	useMutation,
	UseMutationOptions,
	useQuery,
	useQueryClient,
	UseQueryOptions,
} from "@tanstack/react-query";

import type { GetSeatsByHallResponse } from "../generated";
import {
	deleteSeat,
	getSeatsByHall,
	updateSeat,
	UpdateSeatFormValues,
} from "../requests/seat";

export function useAdminSeats(
	hallId: string | null,
	options?: Omit<
		UseQueryOptions<GetSeatsByHallResponse[]>,
		"queryKey" | "queryFn" | "enabled"
	>,
) {
	return useQuery({
		queryKey: ["admin seats", hallId],
		queryFn: () => getSeatsByHall(hallId as string),
		enabled: !!hallId,
		...options,
	});
}

export function useUpdateSeat(
	hallId: string,
	options?: Omit<
		UseMutationOptions<
			GetSeatsByHallResponse,
			unknown,
			{ id: string; values: UpdateSeatFormValues }
		>,
		"mutationKey" | "mutationFn"
	>,
) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["update seat"],
		mutationFn: ({ id, values }) => updateSeat(id, values),
		onSuccess: (...args) => {
			queryClient.invalidateQueries({
				queryKey: ["admin seats", hallId],
			});
			options?.onSuccess?.(...args);
		},
		...options,
	});
}

export function useDeleteSeat(
	hallId: string,
	options?: Omit<
		UseMutationOptions<unknown, unknown, string>,
		"mutationKey" | "mutationFn"
	>,
) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["delete seat"],
		mutationFn: (id: string) => deleteSeat(id),
		onSuccess: (...args) => {
			queryClient.invalidateQueries({
				queryKey: ["admin seats", hallId],
			});
			options?.onSuccess?.(...args);
		},
		...options,
	});
}
