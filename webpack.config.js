const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const pathTo = (dir) => path.join(__dirname, dir);
const nodeExternals = require('webpack-node-externals');

const jsRule = {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: [
        {
            loader: 'babel-loader',
            options: {
                presets: [ '@babel/preset-env', '@babel/preset-react' ],
                plugins: [ '@babel/plugin-proposal-object-rest-spread' ],
                cacheDirectory: true,
                sourceMap: true,
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
                
                use: [
                    MiniCssExtractPlugin.loader, 
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 2, sourceMap: true },
                    }, 
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true,
                        },
                    }
                ],
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'app.css',
        }),
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