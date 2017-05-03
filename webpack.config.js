var webpack = require('webpack');

module.exports = {
    entry: {
        'index': './src/js/index.js',
        'hotellist': './src/js/hotellist.js',
        'hoteldetail': './src/js/hoteldetail.js',
        'hotelorder': './src/js/hotelorder.js'
    },
    output: {
        path: 'dist/js',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {presets: ['es2015']}
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file',
                query: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    }
};