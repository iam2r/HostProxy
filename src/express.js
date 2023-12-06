const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { getIp } = require('./common');
const port = 8788;
const app = express();
app.use(cors());

const createServerInfoMiddleware = () => async (req, res, next) => {
	try {
		const serverIpData = await getIp();
		res.setHeader('Content-Type', 'application/json');
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
	} catch (error) {
		next(error); // 将错误传递给 Express 的错误处理中间件
	}
};

// 配置反向代理
app.use('/:target?', async (req, res, next) => {
	const { target } = req.params;
	if (target) {
		createProxyMiddleware({
			target: `https://${target}`,
			changeOrigin: true,
			pathRewrite: {
				[`^/${target}`]: '', // 将路径中的 `^/${target}` 替换为空字符串
			},
		})(req, res, next);
	} else {
		createServerInfoMiddleware()(req, res, next);
	}
});

// 错误处理中间件
app.use((err, req, res, next) => {
	console.error(err);
	res.status(500).send('Internal Server Error');
});

app.listen(port, () => {
	console.log(`http://localhost:${port}`);
});
