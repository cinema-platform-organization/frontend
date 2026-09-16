export const ROUTES = {
	HOME: "/",
	THEATERS: "/theaters",
	SCHEDULE: "/schedule",
	AUTH: {
		LOGIN: "/auth/login",
		ONBOARDING: "/onboarding",
	},
	MOVIES: {
		ROOT: "/movies",
		SINGLE: (slug: string) => `/movies/${slug}`,
	},
	ACCOUNT: {
		ROOT: "/account",
		TICKETS: "/account/tickets",
		SETTINGS: "/account/settings",
		NOTIFICATIONS: "/account/notifications",
	},
	ADMIN: {
		ROOT: "/admin",
		MOVIES: "/admin/movies",
		CATEGORIES: "/admin/categories",
		CINEMAS: "/admin/cinemas",
		HALLS: (theaterId: string) => `/admin/cinemas/${theaterId}/halls`,
		SEATS: (theaterId: string, hallId: string) =>
			`/admin/cinemas/${theaterId}/halls/${hallId}/seats`,
		SCREENINGS: "/admin/screenings",
	},
};
