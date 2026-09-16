import { z } from "zod";

export const loginSchema = z.object({
	phone: z.string().optional(),
	email: z.string().optional(),
	code: z
		.string()
		.length(6, "Code must be 6 digits")
		.optional()
		.or(z.literal("")),
});

export type LoginSchema = z.infer<typeof loginSchema>;
