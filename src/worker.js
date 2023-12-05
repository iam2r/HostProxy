import { getIp } from './common';

const defaultTargetHost = '';

export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		const hostname = url.hostname;
		let [, targetHost] = url.pathname.split('/');

		targetHost = targetHost || defaultTargetHost;
		if (targetHost) {
			if (url.pathname.startsWith('/')) {
				url.hostname = targetHost;
				url.pathname = url.pathname.replace(new RegExp(`^/${targetHost}`), '');

				const upgradeHeader = request.headers.get('Upgrade');
				/**
				 * 如果是非ws请求携带一个 hostname 参数传递原始域名
				 */
				if (!upgradeHeader || upgradeHeader !== 'websocket') {
					url.searchParams.set('hostname', hostname);
				}
				const modifiedResponse = new Request(url, request);
				modifiedResponse.headers.set('Access-Control-Allow-Origin', '*');
				return fetch(modifiedResponse);
			}
			return env.ASSETS.fetch(request);
		} else {
			const serverIpData = await getIp();
			return new Response(JSON.stringify(serverIpData, null, 2), { status: 200 });
		}
	},
};
