import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

import type { InitEmailChangeRequest } from "../generated";
import { initEmailChange } from "../requests";

export function useInitEmailChange(
	options?: Omit<
		UseMutationOptions<unknown, unknown, InitEmailChangeRequest>,
		"mutationKey" | "mutationFn"
	>,
) {
	return useMutation({
		mutationKey: ["init email change"],
		mutationFn: initEmailChange,
		...options,
	});
}
