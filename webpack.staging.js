const webpack = require('webpack');
const path = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const Dotenv = require('dotenv-webpack');
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common,
    {
        mode: "production",
        output: {
            path: path.resolve(__dirname, 'dist'), // bundle is compiled into this folder
            filename: 'main.js',
            publicPath: '/',
        },
        devtool: 'source-map',
        devServer: {
            historyApiFallback: true,
            // port: 8085
        },
        plugins: [
            new Dotenv({
                path: `./config/staging/.env`,
            }),
            new HtmlWebpackPlugin({
                template: "./public/index.html",
                filename: 'index.html',
                favicon: "./src/spark.ico",
                inject: true,
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [
                        "style-loader", //3. Inject styles into DOM
                        "css-loader", //2. Turns css into commonjs
                        "sass-loader" //1. Turns sass into css
                    ]
                },
                {
                    test: /\.css?$/,
                    use: ['style-loader', 'css-loader']
                },
            ]
        }
    }
);
