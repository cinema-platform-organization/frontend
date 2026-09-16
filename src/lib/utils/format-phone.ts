import { AsYouType } from "libphonenumber-js";

export function formatPhone(value: string, defaultCountry: string = "UA") {
	const formatter = new AsYouType(defaultCountry as any);

	return formatter.input(value);
}
