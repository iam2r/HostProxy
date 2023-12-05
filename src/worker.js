import { getIp } from './common';

const defaultTargetHost = '';
const corsHeaders = {
	'Access-Control-Allow-Headers': '*', // What headers are allowed. * is wildcard. Instead of using '*', you can specify a list of specific headers that are allowed, such as: Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Authorization.
	'Access-Control-Allow-Methods': 'POST', // Allowed methods. Others could be GET, PUT, DELETE etc.
	'Access-Control-Allow-Origin': '*', // This is URLs that are allowed to access the server. * is the wildcard character meaning any URL can.
};
async function handleOptions(request) {
	if (
		request.headers.get('Origin') !== null &&
		request.headers.get('Access-Control-Request-Method') !== null &&
		request.headers.get('Access-Control-Request-Headers') !== null
	) {
		// Handle CORS preflight requests.
		return new Response(null, {
			headers: {
				...corsHeaders,
				'Access-Control-Allow-Headers': request.headers.get('Access-Control-Request-Headers'),
			},
		});
	} else {
		// Handle standard OPTIONS request.
		return new Response(null, {
			headers: {
				Allow: 'GET, HEAD, POST, OPTIONS',
			},
		});
	}
}

export default {
	async fetch(request) {
		const url = new URL(request.url);
		const origin = url.origin;
		if (request.method === 'OPTIONS') {
			return handleOptions(request);
		} else {
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
				const modifiedRequest = new Request(url, request);

				modifiedRequest.headers.set('Origin', url.origin);
				const response = await fetch(modifiedRequest);
				const modifiedResponse = new Response(response.body, response);
				// Set CORS headers

				modifiedResponse.headers.set('Access-Control-Allow-Origin', origin);
				// Append to/Add Vary header so browser will cache response correctly
				modifiedResponse.headers.append('Vary', 'Origin');

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
		}
	},
};
