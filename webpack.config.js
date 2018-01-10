const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const pathTo = (dir) => path.join(__dirname, dir);
const extractLess = new ExtractTextPlugin({
    filename: 'app.css',
});
const nodeExternals = require('webpack-node-externals');

const jsRule = {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: [
        {
            loader: 'babel-loader',
            options: {
                presets: [ 'env', 'react' ],
                cacheDirectory: true,
            },
        }
    ]
};

module.exports = [ {
    entry: {
        client: './src/index.js',
    },
    output: {
        filename: '[name].js',
        path: pathTo('build/client'),
        publicPath: '/',
    },
    resolve: {
        extensions: [ '.js', '.jsx' ],
    },
    module: {
        rules: [
            jsRule,
            {
                test: /\.css/,
                use: extractLess.extract({
                    use: [{
                        loader: 'css-loader',
                        options: { importLoaders: 2, sourceMap: true },
                    }, {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true,
                        },
                    }],
                }),
            },
        ]
    },
    plugins: [
        extractLess,
    ]
},
    {
        entry: {
            server: pathTo('src/server.js'),
        },
        output: {
            filename: '[name].js',
            path: pathTo('build'),
        },
        module: {
            rules: [
                jsRule,
                {
                    test: /\.html$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: './client/',
                            publicPath: '/',
                        }
                    }]
                }
            ],
        },
        target: 'node',
        node: {
            __dirname: false,
            __filename: false,
        },
        externals: [nodeExternals()],
    }
]
;