import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import type { PatchUserRequest } from "../generated";
import { patchUser } from "../requests";

export function usePatchUser(
	options?: Omit<
		UseMutationOptions<unknown, unknown, PatchUserRequest>,
		"mutationKey" | "mutationFn"
	>,
) {
	return useMutation({
		mutationKey: ["patch user"],
		mutationFn: patchUser,
		...options,
	});
}
