const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const globImporter = require('node-sass-glob-importer');
const config = require('../lib/config')()
const path = require('path')
const rootDir = path.resolve('.')
const eyeglass = require('eyeglass')

const JSLoader = {
    test: /^(?!.*\.(stories|component)\.js$).*\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
};

const ImageLoader = {
    test: /\.(png|svg|jpg|gif)$/i,
    exclude: /icons\/.*\.svg$/,
    loader: 'file-loader',
};

const CSSLoader = {
    test: /\.s[ac]ss$/i,
    exclude: /node_modules/,
    use: [
        MiniCssExtractPlugin.loader,
        {
            loader: 'css-loader',
            options: {
                sourceMap: true,
                url: false,
            },
        },
        {
            loader: 'postcss-loader',
            options: {
                sourceMap: true,
            },
        },
        {
            loader: 'sass-loader',
            options: {
                sourceMap: true,
                sassOptions: eyeglass({
                    importer: globImporter(),
                    outputStyle: 'compressed',
                    eyeglass: {
                        root: rootDir,
                        assets: {
                            httpPrefix: config.sass.httpPrefix || path.relative('../../', './'),
                            sources: [
                                {
                                    directory: rootDir,
                                    pattern: config.sass.assetsPattern
                                }
                            ]
                        }
                    }
                }),
            },
        },
    ],
};

const SVGSpriteLoader = {
    test: /icons\/.*\.svg$/, // your icons directory
    loader: 'svg-sprite-loader',
    options: {
        extract: true,
        spriteFilename: '../dist/icons.svg',
    },
};

module.exports = {
    JSLoader,
    CSSLoader,
    SVGSpriteLoader,
    ImageLoader,
};
