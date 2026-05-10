import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			strict: false
		}),
		prerender: {
			entries: ['/', '/about', '/sitemap.xml']
		}
	}
};

export default config;
