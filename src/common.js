module.exports = {
	getIp: async () => {
		const serverIpResponse = await fetch('http://ip-api.com/json');
		const serverIpData = await serverIpResponse.json();
		return serverIpData;
	},
};
