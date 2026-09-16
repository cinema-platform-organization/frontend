export const errorMessages: Record<string, string> = {
	"Invalid or expired code": "Invalid or expired code",
	"User not found": "User not found",
	"Phone already registered": "Phone already registered",
	"Email already registered": "Email already registered",
	"Too many attempts": "Too many attempts. Try again later",
	Unauthorized: "Invalid credentials",
};

export function translateError(message?: string): string {
	if (!message) {
		return "An error occurred. Try again later";
	}

	return errorMessages[message] ?? "An unknown error occurred";
}
