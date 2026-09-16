"use client";

import { useState } from "react";

import { useAdminMovie, useUpdateMovieImages } from "@/api/hooks";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { getMediaSource } from "@/lib/utils/get-media-source";

interface MovieImageModalProps {
	open: boolean;
	movieId: string | null;
	onClose: () => void;
}

export function MovieImageModal({
	open,
	movieId,
	onClose,
}: MovieImageModalProps) {
	const [poster, setPoster] = useState<File | null>(null);
	const [banner, setBanner] = useState<File | null>(null);

	const { data: movie } = useAdminMovie(movieId, { enabled: open });

	const { mutate: updateImages, isPending } = useUpdateMovieImages({
		onSuccess: () => {
			setPoster(null);
			setBanner(null);
			onClose();
		},
	});

	if (!movie) {
		return null;
	}

	function handleSave() {
		if (!poster && !banner) {
			return;
		}
		if (!movieId) {
			return;
		}

		updateImages({
			id: movieId,
			images: {
				...(poster ? { poster } : {}),
				...(banner ? { banner } : {}),
			},
		});
	}

	return (
		<Dialog open={open} onClose={onClose} title={`Images — ${movie.title}`}>
			<div className="space-y-6">
				<div>
					<label className="mb-2 block text-sm font-medium text-neutral-300">
						Poster
					</label>
					<div className="flex items-center gap-4">
						<img
							src={
								poster
									? URL.createObjectURL(poster)
									: getMediaSource(movie.poster)
							}
							alt="Poster preview"
							className="h-32 w-22 rounded object-cover"
						/>
						<input
							type="file"
							accept="image/*"
							onChange={e =>
								setPoster(e.target.files?.[0] ?? null)
							}
							className="text-sm text-neutral-400"
						/>
					</div>
				</div>

				<div>
					<label className="mb-2 block text-sm font-medium text-neutral-300">
						Banner
					</label>
					<div className="flex items-center gap-4">
						{(banner || movie.banner) && (
							<img
								src={
									banner
										? URL.createObjectURL(banner)
										: getMediaSource(movie.banner as string)
								}
								alt="Banner preview"
								className="h-20 w-36 rounded object-cover"
							/>
						)}
						<input
							type="file"
							accept="image/*"
							onChange={e =>
								setBanner(e.target.files?.[0] ?? null)
							}
							className="text-sm text-neutral-400"
						/>
					</div>
				</div>

				<div className="flex justify-end gap-2 pt-2">
					<Button type="button" variant="outline" onClick={onClose}>
						Cancel
					</Button>
					<Button
						onClick={handleSave}
						disabled={isPending || (!poster && !banner)}
					>
						Save images
					</Button>
				</div>
			</div>
		</Dialog>
	);
}
