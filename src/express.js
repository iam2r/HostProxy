const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { getIp } = require('./common');
const port = 8788;
const app = express();
app.use(cors());

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
		// 设置响应的 Content-Type 为 application/json
		res.setHeader('Content-Type', 'application/json');
		// 发送格式化后的 JSON 响应
		res.send(
			JSON.stringify(
				{
					ip: serverIpData,
					server: 'express',
				},
				null,
				2
			)
		);
	}
});
app.listen(port, () => {
	console.log(`http://localhost:${port}`);
});
