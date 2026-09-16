import type { GetMeResponse, PatchUserRequest } from "../generated";
import { instance } from "../instance";

export async function getMe() {
	return await instance.get<GetMeResponse>("/users/@me").then(response => {
		return response.data;
	});
}

export async function patchUser(data: PatchUserRequest) {
	return await instance.patch("/users/@me", data).then(response => {
		return response.data;
	});
}

export async function changeAvatar(file: File) {
	const formData = new FormData();
	formData.append("file", file);

	return await instance
		.patch("/users/@me/avatar", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		})
		.then(response => {
			return response.data;
		});
}
