import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

import type { ConfirmEmailChangeRequest } from "../generated";
import { confirmEmailChange } from "../requests";

export function useConfirmEmailChange(
	options?: Omit<
		UseMutationOptions<any, unknown, ConfirmEmailChangeRequest>,
		"mutationKey" | "mutationFn"
	>,
) {
	return useMutation({
		mutationKey: ["confirm email change"],
		mutationFn: confirmEmailChange,
		...options,
	});
}
