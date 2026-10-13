import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import type { AppControllerHealth200 } from "../generated";
import { getHealthStatus } from "../requests/health";

export function useGetHealthStatus(
	options?: Omit<
		UseQueryOptions<unknown, unknown, AppControllerHealth200>,
		"queryKey" | "queryFn"
	>,
) {
	return useQuery({
		queryKey: ["health status"],
		queryFn: getHealthStatus,
		...options,
	});
}
