import { defineConfig } from "orval";

const API_URL = process.env.ORVAL_API_URL ?? "https://api.cinema-platform.site";

export default defineConfig({
	client: {
		input: `${API_URL}/openapi.yaml`,
		output: {
			schemas: "./src/api/generated",
			clean: true,
		},
	},
});
