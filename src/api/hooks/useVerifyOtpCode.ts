import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

import type { AccessTokenResponse, VerifyOtpRequest } from "../generated";
import { verifyOtpCode } from "../requests";

export function useVerifyOtpCode(
	options?: Omit<
		UseMutationOptions<AccessTokenResponse, unknown, VerifyOtpRequest>,
		"mutationKey" | "mutationFn"
	>,
) {
	return useMutation({
		mutationKey: ["verify otp code"],
		mutationFn: verifyOtpCode,
		...options,
	});
}
