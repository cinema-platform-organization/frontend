import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import type {
	TelegramFinalizeRequest,
	TelegramFinalizeResponse,
} from "../generated";
import { finalizeTelegramAuth } from "../requests/auth";

export function useFinalizeTelegramAuth(
	options?: Omit<
		UseMutationOptions<
			TelegramFinalizeResponse,
			unknown,
			TelegramFinalizeRequest
		>,
		"mutationKey" | "mutationFn"
	>,
) {
	return useMutation({
		mutationKey: ["finalize telegram auth"],
		mutationFn: finalizeTelegramAuth,
		...options,
	});
}
