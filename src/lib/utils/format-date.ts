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
	const date = new Date(`1970-01-01T${timeString}Z`);
	return new Intl.DateTimeFormat("uk-UA", {
		hour: "2-digit",
		minute: "2-digit",
		timeZone: "Europe/Kiev",
	}).format(date);
}
