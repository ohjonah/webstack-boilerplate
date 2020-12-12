const webpack = require('webpack');
var path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
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
            new Dotenv({path: path.resolve(__dirname, '.env')}),
            new webpack.DefinePlugin({
                'FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
                'FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
                'FIREBASE_DB_URL': JSON.stringify(process.env.FIREBASE_DB_URL),
                'FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
                'FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
                'FIREBASE_SENDER_ID': JSON.stringify(process.env.FIREBASE_SENDER_ID),
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
