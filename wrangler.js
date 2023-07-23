const fs = require('fs');
const TOML = require('@ltd/j-toml');
const wranglerToml = `
name = 'hostproxy'
main = 'src/worker.js'
compatibility_date = '2023-06-27'
[placement]
mode = "smart"
[vars]
`;
const tomlData = TOML.parse(wranglerToml);

fs.writeFile('./wrangler.toml', TOML.stringify(tomlData).join('\n'), () => {
	/**
	 *
	 */
});
