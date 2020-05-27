"use strict";

const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const rootDir = __dirname;
const buildDir = path.join(rootDir, "build");
const electronDir = path.join(rootDir, "electron");
const srcDir = path.join(rootDir, "src");

module.exports = {
	target: "electron-renderer",
	entry: path.join(srcDir, "index.tsx"),
	output: {
		path: buildDir,
		filename: "index.js",
		publicPath: "/",
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "ts-loader",
				options: {
					transpileOnly: true,
					configFile: path.join(rootDir, "tsconfig.json"),
				},
			},
		],
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".json"],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(electronDir, "index.html"),
		}),
		new ForkTsCheckerWebpackPlugin({
			tsconfig: path.join(rootDir, "tsconfig.json"),
			measureCompilationTime: true,
		}),
	],
	node: false,
	devtool: "cheap-module-source-map",
	devServer: {
		compress: false,
	},
};
