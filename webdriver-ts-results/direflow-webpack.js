const { webpackConfig } = require('direflow-scripts');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var InlineChunkHtmlPlugin = require('inline-chunk-html-plugin');

var path = require('path')

/**
 * Webpack configuration for Direflow Component
 * Additional webpack plugins / overrides can be provided here
 */
module.exports = (config, env) => ({
  ...webpackConfig(config, env),
  // Add your own webpack config here (optional)
  // plugins: [
  //   // new BundleAnalyzerPlugin(),
  //   new HtmlWebpackPlugin({
  //     template: path.join(__dirname, 'public/index.html'),
  //     filename: 'table.html',
  //     inject: 'body',
  //     inlineSource: '.js$' // embed all javascript and css inline
	// 	}),
  //   new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/main/])
  // ]
});
