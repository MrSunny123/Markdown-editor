var path = require('path');
var webpack = require('webpack')

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'build.js'
    },
    resolveLoader: {
        root: path.join(__dirname, 'node_modules'),
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.css/,
                exclude: /^node_modules$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.less/,
                exclude: /^node_modules$/,
                loader: `style-loader!css-loader!autoprefixer-loader?{
                    browsers: [
                        'ie >= 8',
                        'ie_mob >= 10',
                        'ff >= 26',
                        'chrome >= 30',
                        'safari >= 6',
                        'opera >= 23',
                        'ios >= 5',
                        'android >= 2.3',
                        'bb >= 10'
                    ]
                }!less-loader`
            },
            {
                test: /\.(png|jpg)$/,
                exclude: /^node_modules$/,
                loader: 'url?limit=20000&name=[name].[ext]' //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
            },
            {
                test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
                exclude: /^node_modules$/,
                loader: 'file-loader?name=[name].[ext]'
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    devtool: '#eval-source-map',
    resolve: {
        extensions: ['', '.js', '.vue'], //后缀名自动补全
    }
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ])
}