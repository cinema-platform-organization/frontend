import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

import { logout } from "../requests";

export function useLogout(
	options?: Omit<
		UseMutationOptions<unknown, unknown>,
		"mutationKey" | "mutationFn"
	>,
) {
	return useMutation({
		mutationKey: ["logout"],
		mutationFn: logout,
		...options,
	});
}
