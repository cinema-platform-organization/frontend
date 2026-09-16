import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

import type { ConfirmPhoneChangeRequest } from "../generated";
import { confirmPhoneChange } from "../requests";

export function useConfirmPhoneChange(
	options?: Omit<
		UseMutationOptions<any, unknown, ConfirmPhoneChangeRequest>,
		"mutationKey" | "mutationFn"
	>,
) {
	return useMutation({
		mutationKey: ["confirm phone change"],
		mutationFn: confirmPhoneChange,
		...options,
	});
}
