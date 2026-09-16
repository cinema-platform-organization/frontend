import Link from "next/link";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	baseUrl: string;
	searchParams?: Record<string, string | undefined>;
}

const linkStyles =
	"flex items-center justify-center rounded-full border-2 border-white/30 px-6 py-2 text-base font-medium text-white transition-all duration-250 hover:scale-105 hover:border-white/70 active:scale-100";

const disabledStyles =
	"flex items-center justify-center rounded-full border-2 border-white/10 px-6 py-2 text-base font-medium text-white/30 cursor-not-allowed";

export function Pagination({
	currentPage,
	totalPages,
	baseUrl,
	searchParams = {},
}: PaginationProps) {
	if (totalPages <= 1) return null;

	const createPageUrl = (pageNumber: number) => {
		const params = new URLSearchParams();
		Object.entries(searchParams).forEach(([key, value]) => {
			if (value) params.set(key, value);
		});
		params.set("page", pageNumber.toString());
		return `${baseUrl}?${params.toString()}`;
	};

	return (
		<div className="mt-12 flex items-center justify-center gap-4">
			{currentPage > 1 ? (
				<Link
					href={createPageUrl(currentPage - 1)}
					className={linkStyles}
				>
					Previous
				</Link>
			) : (
				<span className={disabledStyles}>Previous</span>
			)}

			<span className="text-sm text-neutral-400">
				Page{" "}
				<span className="font-semibold text-white">{currentPage}</span>{" "}
				of{" "}
				<span className="font-semibold text-white">{totalPages}</span>
			</span>

			{currentPage < totalPages ? (
				<Link
					href={createPageUrl(currentPage + 1)}
					className={linkStyles}
				>
					Next
				</Link>
			) : (
				<span className={disabledStyles}>Next</span>
			)}
		</div>
	);
}
