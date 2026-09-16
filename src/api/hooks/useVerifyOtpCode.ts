import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

import type { VerifyOtpRequest, VerifyOtpResponse } from "../generated";
import { verifyOtpCode } from "../requests";

export function useVerifyOtpCode(
	options?: Omit<
		UseMutationOptions<VerifyOtpResponse, unknown, VerifyOtpRequest>,
		"mutationKey" | "mutationFn"
	>,
) {
	return useMutation({
		mutationKey: ["verify otp code"],
		mutationFn: verifyOtpCode,
		...options,
	});
}
