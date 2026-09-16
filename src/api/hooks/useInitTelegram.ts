import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

import { initTelegram } from "../requests";

export function useInitTelegram(
	options?: Omit<
		UseMutationOptions<any, unknown, unknown>,
		"mutationKey" | "mutationFn"
	>,
) {
	return useMutation({
		mutationKey: ["init telegram"],
		mutationFn: initTelegram,
		...options,
	});
}
