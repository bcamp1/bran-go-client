const { join } = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const { HotModuleReplacementPlugin } = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        room: join(__dirname, 'src', 'room.js'), 
        home: join(__dirname, 'src', 'home.js')
    }, 
    output: {
        path: join(__dirname, 'build'), 
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /.vue$/, 
                loader: 'vue-loader'
            },
            {
                test: /\.css$/, 
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new HotModuleReplacementPlugin(),
        new VueLoaderPlugin(),
    ]
};