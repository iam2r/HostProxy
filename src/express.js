const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { getIp } = require('./common');
const port = 3000;
const app = express();
const proxyTarget = (process.env.PROXY_TARGET || '').split(',').filter(Boolean);
console.log(proxyTarget);
app.use(cors());
proxyTarget.forEach((route) => {
	app.use(
		`/${route}`,
		createProxyMiddleware({
			target: `https://${route}`,
			changeOrigin: true,
			pathRewrite: {
				[`^/${route}`]: '',
			},
		})
	);
});

app.use('/', async (req, res) => {
	const url = require('url').parse(req.url, true);
	console.log(url);
	let [, targetHost] = url.pathname.split('/');

	targetHost = targetHost || '';
	if (targetHost) {
		req.hostname = targetHost;
		url.pathname = url.pathname.replace(new RegExp(`^/${targetHost}`), '');

		req.url = require('url').format(url);
		return createProxyMiddleware({
			target: `https://${targetHost}`,
			changeOrigin: true,
			pathRewrite: {
				[`^/${targetHost}`]: '',
			},
		})(req, res);
	} else {
		const serverIpData = await getIp();
		res.json(serverIpData);
	}
});
app.listen(port, () => {
	console.log(`http://localhost:${port}`);
});
