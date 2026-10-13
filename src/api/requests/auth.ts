import type {
	AccessTokenResponse,
	AuthControllerTelegramVerify200,
	OkResponse,
	SendOtpRequest,
	TelegramFinalizeRequest,
	TelegramVerifyRequest,
	VerifyOtpRequest,
} from "../generated";
import { api } from "../instance";

export async function sendOtpCode(data: SendOtpRequest) {
	return await api.post<OkResponse>("/auth/otp/send", data).then(response => {
		return response.data;
	});
}

export async function verifyOtpCode(data: VerifyOtpRequest) {
	return await api
		.post<AccessTokenResponse>("/auth/otp/verify", data)
		.then(response => {
			return response.data;
		});
}

export async function refresh() {
	return await api
		.post<AccessTokenResponse>("/auth/refresh")
		.then(response => {
			return response.data;
		});
}

export async function logout() {
	return await api.post("/auth/logout").then(response => {
		return response.data;
	});
}

export async function initTelegram() {
	return await api.get<any>("/auth/telegram").then(response => {
		return response.data;
	});
}

export async function verifyTelegramAuth(data: TelegramVerifyRequest) {
	return await api
		.post<AuthControllerTelegramVerify200>("/auth/telegram/verify", data)
		.then(response => {
			return response.data;
		});
}

export async function finalizeTelegramAuth(data: TelegramFinalizeRequest) {
	return await api
		.post<AccessTokenResponse>("/auth/telegram/finalize", data)
		.then(response => {
			return response.data;
		});
}
