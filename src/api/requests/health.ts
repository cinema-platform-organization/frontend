import type { HealthResponse } from "../generated";
import { instance } from "../instance";

export async function getHealthStatus() {
	return await instance.get<HealthResponse>("/health").then(res => {
		return res.data;
	});
}
