
module.exports = {
    entry: "./js/viz.js",
    output: {
        path: __dirname + '/static/js',
        filename: "bundle.js"
    },
    devServer: {
        contentBase: './static',
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            {
                test: /\.(png|gif|jpg|jpeg)$/,
                loader: 'file-loader'
            },
            { test: /Cesium\.js$/, loader: 'script' }
        ]
    }
};
