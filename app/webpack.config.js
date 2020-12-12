const webpack = require('webpack');
var path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => {
    return {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            publicPath: path.resolve(__dirname, '/'),
            filename: 'bundle.js',
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader'],
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: { importLoaders: 1 },
                        },
                        'postcss-loader',
                    ],
                },
                {
                    test: /\.svg$/,
                    use: ['@svgr/webpack'],
                },
            ],
        },
        resolve: {
            extensions: ['*', '.js', '.jsx'],
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new CleanWebpackPlugin(),
            // new Dotenv({path: path.resolve(__dirname, '.env')}),
            new webpack.DefinePlugin({
                'apiKey': JSON.stringify(process.env.FIREBASE_API_KEY),
                'authDomain': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
                'databaseURL': JSON.stringify(process.env.FIREBASE_DB_URL),
                'projectId': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
                'storageBucket': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
                'messagingSenderId': JSON.stringify(process.env.FIREBASE_SENDER_ID),
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, './src/index.html'),
            }),
        ],
        devServer: {
            contentBase: path.resolve(__dirname, 'dist'),
            hot: true,
            historyApiFallback: true,
            open: true,
        },
    };
}
