import { GetMovieResponse, PaginatedMoviesResponse } from "../generated";
import { api, instance } from "../instance";

export interface MovieFormValues {
	title: string;
	slug?: string;
	description: string;
	duration: number;
	releaseYear?: number;
	releaseDate?: string;
	ratingAge?: number;
	country?: string;
	categoryId?: string;
}

function buildMovieFormData(values: Partial<MovieFormValues>) {
	const formData = new FormData();

	if (values.title !== undefined) {
		formData.append("title", values.title);
	}
	if (values.slug !== undefined) {
		formData.append("slug", values.slug);
	}
	if (values.description !== undefined) {
		formData.append("description", values.description);
	}
	if (values.duration !== undefined) {
		formData.append("duration", String(values.duration));
	}
	if (values.releaseYear !== undefined) {
		formData.append("releaseYear", String(values.releaseYear));
	}
	if (values.releaseDate !== undefined) {
		formData.append("releaseDate", values.releaseDate);
	}
	if (values.ratingAge !== undefined) {
		formData.append("ratingAge", String(values.ratingAge));
	}
	if (values.country !== undefined) {
		formData.append("country", values.country);
	}
	if (values.categoryId !== undefined) {
		formData.append("categoryId", values.categoryId);
	}

	return formData;
}

export async function getAllMovies(params?: {
	category?: string;
	random?: boolean;
	limit?: number;
	page?: number;
}) {
	return await api
		.get<PaginatedMoviesResponse>("/movies", {
			params,
		})
		.then(response => {
			return response.data;
		});
}

export async function getPopularMovies() {
	return await api
		.get<PaginatedMoviesResponse>("/movies/popular")
		.then(response => {
			return response.data;
		});
}

export async function getMovieBySlug(slug: string) {
	return await api.get(`/movies/${slug}`).then(response => {
		return response.data;
	});
}

export async function getMovieById(id: string) {
	return await instance
		.get<GetMovieResponse>(`/movies/id/${id}`)
		.then(response => {
			return response.data;
		});
}

export async function createMovie(
	values: MovieFormValues & { poster: File; banner?: File },
) {
	const formData = buildMovieFormData(values);
	formData.append("poster", values.poster);
	if (values.banner) formData.append("banner", values.banner);

	return await instance
		.post<GetMovieResponse>("/movies", formData, {
			headers: { "Content-Type": "multipart/form-data" },
		})
		.then(response => {
			return response.data;
		});
}

export async function updateMovie(
	id: string,
	values: Partial<MovieFormValues>,
) {
	const formData = buildMovieFormData(values);

	return await instance
		.patch<GetMovieResponse>(`/movies/${id}`, formData, {
			headers: { "Content-Type": "multipart/form-data" },
		})
		.then(response => {
			return response.data;
		});
}

export async function updateMovieImages(
	id: string,
	images: { poster?: File; banner?: File },
) {
	const formData = new FormData();
	if (images.poster) formData.append("poster", images.poster);
	if (images.banner) formData.append("banner", images.banner);

	return await instance
		.patch<GetMovieResponse>(`/movies/${id}`, formData, {
			headers: { "Content-Type": "multipart/form-data" },
		})
		.then(response => {
			return response.data;
		});
}

export async function deleteMovie(id: string) {
	return await instance.delete(`/movies/${id}`).then(response => {
		return response.data;
	});
}
