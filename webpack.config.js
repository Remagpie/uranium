"use strict";

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const buildDir = path.join(__dirname, "build");
const electronDir = path.join(__dirname, "electron");
const srcDir = path.join(__dirname, "src");

module.exports = {
	target: "electron-renderer",
	entry: path.join(srcDir, "index.js"),
	output: {
		path: buildDir,
		filename: "index.js",
		publicPath: "/",
	},
	module: {
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".json"],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(electronDir, "index.html"),
		}),
	],
	node: false,
	devtool: "cheap-module-source-map",
	devServer: {
		compress: false,
	},
};
