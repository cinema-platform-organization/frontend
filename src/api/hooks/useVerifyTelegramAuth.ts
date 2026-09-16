import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import type {
	TelegramVerifyRequest,
	TelegramVerifyResponse,
} from "../generated";
import { verifyTelegramAuth } from "../requests/auth";

export function useVerifyTelegramAuth(
	options?: Omit<
		UseMutationOptions<
			TelegramVerifyResponse,
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
