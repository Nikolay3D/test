const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

require('dotenv').config()
const CLIENT_DEV_PORT = process.env.CLIENT_DEV_PORT || 5001
const SERVER_DEV_PORT = process.env.PORT || 5000

const outputDirectory = 'build'

module.exports = {
    entry: [
        '@babel/polyfill',
        './src/client/index.js'
    ],
    //entry: './src/client/index.js',
    output: {
        path: path.join(__dirname, outputDirectory),
        filename: 'bundle.js',
    },
    // resolve: {
    //     modules: [path.join(__dirname, 'src'), 'node_modules'],
    //     alias: {
    //         react: path.join(__dirname, 'node_modules', 'react'),
    //     },
    // },
    devServer: {
        inline:true,
        port: CLIENT_DEV_PORT,
        proxy: {
            "/": {
                target: 'http://localhost:' + `${SERVER_DEV_PORT}`
            }
        }
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            }
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({
            template: './src/client/index.html',
            favicon: './src/client/favicon.png'
        }),
    ],
};
