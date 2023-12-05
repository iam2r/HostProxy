import { getIp } from './common';

const defaultTargetHost = '';

export default {
	async fetch(request) {
		const url = new URL(request.url);
		const hostname = url.hostname;
		let [, targetHost] = url.pathname.split('/');

		targetHost = targetHost || defaultTargetHost;
		if (targetHost) {
			url.hostname = targetHost;
			url.pathname = url.pathname.replace(new RegExp(`^/${targetHost}`), '');

			const upgradeHeader = request.headers.get('Upgrade');
			/**
			 * 如果是非ws请求携带一个 hostname 参数传递原始域名
			 */
			if (!upgradeHeader || upgradeHeader !== 'websocket') {
				url.searchParams.set('hostname', hostname);
			}
			const modifiedRequest = new Request(url, {
				...request,
				redirect: 'follow',
			});
			const response = await fetch(modifiedRequest);
			const modifiedResponse = new Response(response.body, response);
			// 添加允许跨域访问的响应头
			modifiedResponse.headers.set('Access-Control-Allow-Origin', '*');
			modifiedResponse.headers.set(
				'Access-Control-Allow-Headers',
				'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method'
			);
			modifiedResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE');
			modifiedResponse.headers.set('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE');

			return modifiedResponse;
		} else {
			const serverIpData = await getIp();
			return new Response(
				JSON.stringify(
					{
						ip: serverIpData,
						server: 'worker',
					},
					null,
					2
				),
				{ status: 200 }
			);
		}
	},
};
