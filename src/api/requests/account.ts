import type {
	ConfirmEmailChangeRequest,
	ConfirmPhoneChangeRequest,
	InitEmailChangeRequest,
	InitPhoneChangeRequest,
} from "../generated";
import { instance } from "../instance";

export async function initEmailChange(data: InitEmailChangeRequest) {
	return await instance.post("/account/email/init", data).then(response => {
		return response.data;
	});
}

export async function confirmEmailChange(data: ConfirmEmailChangeRequest) {
	return await instance
		.post("/account/email/confirm", data)
		.then(response => {
			return response.data;
		});
}

export async function initPhoneChange(data: InitPhoneChangeRequest) {
	return await instance.post("/account/phone/init", data).then(response => {
		return response.data;
	});
}

export async function confirmPhoneChange(data: ConfirmPhoneChangeRequest) {
	return await instance
		.post("/account/phone/confirm", data)
		.then(response => {
			return response.data;
		});
}
