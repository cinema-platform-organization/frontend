import { z } from "zod";

export const onboardingSchema = z.object({
	name: z.string().min(2, "Name must be longer").max(40, "Name is too long"),
});

export type OnboardingSchema = z.infer<typeof onboardingSchema>;
