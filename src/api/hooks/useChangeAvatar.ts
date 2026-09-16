import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { changeAvatar } from "../requests";

export function useChangeAvatar(
	options?: Omit<
		UseMutationOptions<unknown, unknown, unknown>,
		"mutationKey" | "mutationFn"
	>,
) {
	return useMutation({
		mutationKey: ["change avatar"],
		mutationFn: changeAvatar,
		...options,
	});
}
