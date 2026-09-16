import type {
	SendOtpRequest,
	SendOtpResponse,
	TelegramFinalizeRequest,
	TelegramFinalizeResponse,
	TelegramVerifyRequest,
	TelegramVerifyResponse,
	VerifyOtpRequest,
	VerifyOtpResponse,
} from "../generated";
import { api } from "../instance";

export async function sendOtpCode(data: SendOtpRequest) {
	return await api
		.post<SendOtpResponse>("/auth/otp/send", data)
		.then(response => {
			return response.data;
		});
}

export async function verifyOtpCode(data: VerifyOtpRequest) {
	return await api
		.post<VerifyOtpResponse>("/auth/otp/verify", data)
		.then(response => {
			return response.data;
		});
}

export async function refresh() {
	return await api.post<VerifyOtpResponse>("/auth/refresh").then(response => {
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
		.post<TelegramVerifyResponse>("/auth/telegram/verify", data)
		.then(response => {
			return response.data;
		});
}

export async function finalizeTelegramAuth(data: TelegramFinalizeRequest) {
	return await api
		.post<TelegramFinalizeResponse>("/auth/telegram/finalize", data)
		.then(response => {
			return response.data;
		});
}
