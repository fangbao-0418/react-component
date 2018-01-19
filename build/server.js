const Koa = require('koa');
const webpack = require('webpack');
const { devMiddleware, hotMiddleware } = require('koa-webpack-middleware')
const proxy = require('koa-proxies')

const app = new Koa();
const config = require('../webpack.config.js')
const compiler = webpack(config)

const proxyUrl = 'https://x-agent.i-counting.cn/'

app.use(proxy('/api', {target: proxyUrl, changeOrigin: true}))
app.use(devMiddleware(compiler, {
  stats: {
		colors: true
	}
}))

app.use(hotMiddleware(compiler))

app.listen(3000, function () {
  console.log('app listening on port 3001!\n');
})
