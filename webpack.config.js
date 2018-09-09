var path = require('path')
var VueLoaderPlugin = require('vue-loader/lib/plugin')


var isProd = process.env.NODE_ENV='production'


module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(
            __dirname, isProd ? './dist': './src'),
        filename: 'main.js'
    },
    devServer: {
        contentBase: path.join(__dirname, 'src'),
    },
    mode: process.env.NODE_ENV,
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
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
        new VueLoaderPlugin()
    ]
}
