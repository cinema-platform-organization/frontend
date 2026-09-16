import type { InitPaymentRequest } from "../generated";
import { instance } from "../instance";

export async function initPayment(data: InitPaymentRequest) {
	return await instance.post("/payment/init", data).then(res => {
		return res.data;
	});
}

export async function refundPayment(bookingId: string) {
	return await instance.post(`/payment/refund/${bookingId}`).then(res => {
		return res.data;
	});
}
