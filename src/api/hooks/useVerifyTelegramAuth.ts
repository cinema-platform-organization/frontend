import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import type {
	AuthControllerTelegramVerify200,
	TelegramVerifyRequest,
} from "../generated";
import { verifyTelegramAuth } from "../requests/auth";

export function useVerifyTelegramAuth(
	options?: Omit<
		UseMutationOptions<
			AuthControllerTelegramVerify200,
			unknown,
			TelegramVerifyRequest
		>,
		"mutationKey" | "mutationFn"
	>,
) {
	return useMutation({
		mutationKey: ["verify telegram auth"],
		mutationFn: verifyTelegramAuth,
		...options,
	});
}
