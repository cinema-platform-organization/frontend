import {
	useMutation,
	UseMutationOptions,
	useQuery,
	useQueryClient,
	UseQueryOptions,
} from "@tanstack/react-query";

import type { GetMovieResponse, PaginatedMoviesResponse } from "../generated";
import {
	createMovie,
	deleteMovie,
	getAllMovies,
	getMovieById,
	MovieFormValues,
	updateMovie,
	updateMovieImages,
} from "../requests/movie";

export function useAdminMovies(
	params?: { limit?: number; page?: number },
	options?: Omit<
		UseQueryOptions<PaginatedMoviesResponse>,
		"queryKey" | "queryFn"
	>,
) {
	return useQuery({
		queryKey: ["admin movies", params],
		queryFn: () => getAllMovies(params),
		...options,
	});
}

export function useAdminMovie(
	id: string | null,
	options?: Omit<UseQueryOptions<GetMovieResponse>, "queryKey" | "queryFn">,
) {
	return useQuery({
		queryKey: ["admin movie", id],
		queryFn: () => getMovieById(id as string),
		enabled: !!id && (options?.enabled ?? true),
		...options,
	});
}

export function useCreateMovie(
	options?: Omit<
		UseMutationOptions<
			GetMovieResponse,
			unknown,
			MovieFormValues & { poster: File; banner?: File }
		>,
		"mutationKey" | "mutationFn"
	>,
) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["create movie"],
		mutationFn: createMovie,
		onSuccess: (...args) => {
			queryClient.invalidateQueries({ queryKey: ["admin movies"] });
			options?.onSuccess?.(...args);
		},
		...options,
	});
}

export function useUpdateMovie(
	options?: Omit<
		UseMutationOptions<
			GetMovieResponse,
			unknown,
			{ id: string; values: Partial<MovieFormValues> }
		>,
		"mutationKey" | "mutationFn"
	>,
) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["update movie"],
		mutationFn: ({ id, values }) => updateMovie(id, values),
		onSuccess: (...args) => {
			queryClient.invalidateQueries({ queryKey: ["admin movies"] });
			queryClient.invalidateQueries({ queryKey: ["admin movie"] });
			options?.onSuccess?.(...args);
		},
		...options,
	});
}

export function useUpdateMovieImages(
	options?: Omit<
		UseMutationOptions<
			GetMovieResponse,
			unknown,
			{ id: string; images: { poster?: File; banner?: File } }
		>,
		"mutationKey" | "mutationFn"
	>,
) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["update movie images"],
		mutationFn: ({ id, images }) => updateMovieImages(id, images),
		onSuccess: (...args) => {
			queryClient.invalidateQueries({ queryKey: ["admin movies"] });
			queryClient.invalidateQueries({ queryKey: ["admin movie"] });
			options?.onSuccess?.(...args);
		},
		...options,
	});
}

export function useDeleteMovie(
	options?: Omit<
		UseMutationOptions<unknown, unknown, string>,
		"mutationKey" | "mutationFn"
	>,
) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["delete movie"],
		mutationFn: (id: string) => deleteMovie(id),
		onSuccess: (...args) => {
			queryClient.invalidateQueries({ queryKey: ["admin movies"] });
			options?.onSuccess?.(...args);
		},
		...options,
	});
}
