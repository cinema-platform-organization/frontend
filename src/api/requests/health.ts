import type { AppControllerHealth200 } from "../generated";
import { instance } from "../instance";

export async function getHealthStatus() {
	return await instance.get<AppControllerHealth200>("/health").then(res => {
		return res.data;
	});
}
