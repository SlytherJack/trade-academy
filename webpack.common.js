const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    context: __dirname,
    entry: './src/index.js', // entry point for the application
    plugins: [
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        // new BundleAnalyzerPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(png|j?g|svg|gif)?$/,
                use: 'file-loader'
            },
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }
            },
        ]
    },
};
