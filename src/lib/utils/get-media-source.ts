export function getMediaSource(path: string) {
	const baseUrl = (process.env.NEXT_PUBLIC_MEDIA_URL ?? "").replace(
		/\/+$/,
		"",
	);
	const cleanPath = path.replace(/^\/+/, "");

	return `${baseUrl}/${cleanPath}`;
}
