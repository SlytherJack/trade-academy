const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');
const dotenv = require('dotenv');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = (node_env, options) => {
    let current_node_env = node_env.split('NODE_ENV=')[1];

    const env = dotenv.config({ path: `./config/${current_node_env}/.env` }).parsed;
    const envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {});

    return {
        context: __dirname,
        entry: './src/index.js', // entry point for the application
        output: {
            path: path.resolve(__dirname, 'dist'), // bundle is compiled into this folder
            filename: 'main.js',
            publicPath: '/',
        },
        devServer: {
            historyApiFallback: true,
        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.js?$/,
                    exclude: /node_module/,
                    use: 'babel-loader' // Use this to transpile .jsx into .js
                },
                {
                    test: /\.scss$/,
                    use: [
                        "style-loader", // Creates style nodes from JS strings
                        "css-loader", // Translates CSS into CommonJS
                        "sass-loader" // Compiles Sass to CSS, using Node Sass by default
                    ]
                },
                {
                    test: /\.css?$/,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.(png|j?g|svg|gif)?$/,
                    use: 'file-loader'
                }
            ]
        },
        plugins: [
            new HtmlWebPackPlugin({
                template: path.resolve(__dirname, 'public/index.html'),
                favicon: "./src/spark.ico",
                filename: 'index.html', // Render this file through webpack dev server
                inject: true
            }),
            new webpack.DefinePlugin(envKeys),
            // new CompressionPlugin(),
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            new BundleAnalyzerPlugin()
        ]
    };
};
