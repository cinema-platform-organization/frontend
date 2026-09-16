import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

import type { InitPhoneChangeRequest } from "../generated";
import { initPhoneChange } from "../requests";

export function useInitPhoneChange(
	options?: Omit<
		UseMutationOptions<unknown, unknown, InitPhoneChangeRequest>,
		"mutationKey" | "mutationFn"
	>,
) {
	return useMutation({
		mutationKey: ["init phone change"],
		mutationFn: initPhoneChange,
		...options,
	});
}
