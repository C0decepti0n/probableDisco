// allows file path breakdowns
const path = require('path');
// generates the html
const HtmlWebpackPlugin = require('html-webpack-plugin');
// shows webpack bar loading....
const WebpackBar = require('webpackbar');
// clears files in the dist directory
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'client', 'index.jsx'),
    output:{ filename: 'bundle.js', path: path.resolve(__dirname,'dist')},
    watch: true,
    module: {
        rules: [{
            test: /\.(jsx|js)$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ['@babel/preset-env',
                            '@babel/preset-react'],
                }
            }
        },
        {
            test: /\.png$/,
            use: [
                {
                 loader: "file-loader",
                 options: {
                    name: "[name].[hash].[ext]",
                    outputPath: "images/"
                 }   
                }
            ]
        }
    ]
    },
    plugins: [
        new WebpackBar(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            path: path.resolve(__dirname, 'dist'),
            filename: 'index.html',
            template:'template.ejs',
            // favicon: path.resolve(__dirname, 'client/images/favicon.ico')
        }),
    ]


};
