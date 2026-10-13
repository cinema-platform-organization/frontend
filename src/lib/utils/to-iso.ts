// The API sends UTC timestamps without a zone marker, e.g. "2026-10-20 16:30:00.000".
// Without the "Z" browsers read them as local time, and Safari can't parse the space.
const ZONELESS = /^\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}(:\d{2}(\.\d+)?)?$/;

export function parseApiDate(value: string | Date): Date {
	if (value instanceof Date) {
		return value;
	}

	const normalized = ZONELESS.test(value)
		? `${value.replace(" ", "T")}Z`
		: value;

	return new Date(normalized);
}

export function toISO(value: string | Date | null | undefined): string | null {
	if (!value) {
		return null;
	}

	const date = parseApiDate(value);

	if (isNaN(date.getTime())) {
		return null;
	}

	return date.toISOString();
}

const KYIV_TIME = new Intl.DateTimeFormat("uk-UA", {
	timeZone: "Europe/Kyiv",
	hour: "2-digit",
	minute: "2-digit",
	hourCycle: "h23",
});

/** "HH:mm" in Kyiv time, whatever the user's or server's time zone */
export function toKyivTime(
	value: string | Date | null | undefined,
): string | undefined {
	if (!value) {
		return undefined;
	}

	const date = parseApiDate(value);

	if (isNaN(date.getTime())) {
		return undefined;
	}

	return KYIV_TIME.format(date);
}
