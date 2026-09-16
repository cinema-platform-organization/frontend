export interface PaginatedResult<T> {
	items: T[];
	pagination: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
	};
}

interface RawPaginatedResponse<T> {
	data: T[];
	page: number;
	limit: number;
	total: number;
	totalPages: number;
}

export function toPaginatedResult<T>(
	response: RawPaginatedResponse<T>,
): PaginatedResult<T> {
	return {
		items: response.data,
		pagination: {
			page: response.page,
			limit: response.limit,
			total: response.total,
			totalPages: response.totalPages,
		},
	};
}
