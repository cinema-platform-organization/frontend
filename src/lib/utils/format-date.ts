export function formatReleaseDate(dateString: string): string | null {
	if (!dateString) {
		return null;
	}

	const date = new Date(dateString);
	const day = date.getUTCDate();
	const monthIndex = date.getUTCMonth();

	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	return `from ${day} ${months[monthIndex]}`;
}

export function formatOrderTime(timeString: string) {
	return timeString.slice(0, 5);
}
