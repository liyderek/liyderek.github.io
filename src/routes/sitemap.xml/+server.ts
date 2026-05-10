import type { RequestHandler } from './$types';

const siteUrl = 'https://liyderek.github.io';

export const prerender = true;

export const GET: RequestHandler = async () => {
	const pages = ['/', '/about'];

	const urls = pages
		.map(
			(path) =>
				`<url><loc>${siteUrl}${path === '/' ? '/' : path}</loc><changefreq>weekly</changefreq><priority>${path === '/' ? '1.0' : '0.7'}</priority></url>`
		)
		.join('');

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
};

