import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// Explicitly use the Vercel adapter for Vercel deployments
		adapter: adapter()
	}
};

export default config;
