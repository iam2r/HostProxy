/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);
		const hostname = url.hostname;
		const [,targetHost] = hostname.match(/(\S+)\.(proxy\.\S+)/) || []
		if (targetHost) {
			if (url.pathname.startsWith('/')) {
				url.hostname = targetHost;
				return fetch(new Request(url, request));
			}
			return env.ASSETS.fetch(request);
		}else{
			return new Response('Not found', { status: 404 })
		}
	},
};
