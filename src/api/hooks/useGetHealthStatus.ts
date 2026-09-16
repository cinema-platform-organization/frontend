import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import type { HealthResponse } from "../generated";
import { getHealthStatus } from "../requests/health";

export function useGetHealthStatus(
	options?: Omit<
		UseQueryOptions<unknown, unknown, HealthResponse>,
		"queryKey" | "queryFn"
	>,
) {
	return useQuery({
		queryKey: ["health status"],
		queryFn: getHealthStatus,
		...options,
	});
}
