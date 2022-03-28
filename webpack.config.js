const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: ['./public/Script.js', './public/ComponentCart.js', './public/ComponentFilter.js', './public/ComponentProduct.js'],
    output: {
    filename: "./build.js"
    },
module: {
    rules: [
        {
            test: /\.vue$/,
            loader: 'vue-loader'
        }
    ]
},
plugins: [
    new HtmlWebpackPlugin({
        template: "./public/index.html"
    }),
    new VueLoaderPlugin()
]
}