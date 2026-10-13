import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

import type { OkResponse, SendOtpRequest } from "../generated";
import { sendOtpCode } from "../requests";

export function useSendOtpCode(
	options?: Omit<
		UseMutationOptions<OkResponse, unknown, SendOtpRequest>,
		"mutationKey" | "mutationFn"
	>,
) {
	return useMutation({
		mutationKey: ["send otp code"],
		mutationFn: sendOtpCode,
		...options,
	});
}
