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
	async fetch(request, env) {
		const url = new URL(request.url);
		const hostname = url.hostname;
		let [, targetHost] = hostname.match(/(\S+)\.(proxy\.\S+)/) || [];
		if(!targetHost){
			 targetHost = (hostname.match(/^proxy\.(\S+)/) || [])[1];
		}
		if (targetHost) {
			if (url.pathname.startsWith('/')) {
				url.hostname = targetHost;
				const upgradeHeader = request.headers.get('Upgrade');
				/**
				 * 如果是非ws请求携带一个 hostname 参数传递原始域名 
				 */
				if (!upgradeHeader || upgradeHeader !== 'websocket') {
					url.searchParams.set('hostname', hostname);
				}
				return fetch(new Request(url, request));
			}
			return env.ASSETS.fetch(request);
		} else {
			return new Response('Not found', { status: 404 });
		}
	},
};
