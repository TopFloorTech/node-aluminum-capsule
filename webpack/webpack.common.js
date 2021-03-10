const path = require('path')
const glob = require('glob')
const loaders = require('./loaders')
const plugins = require('./plugins')
const config = require('../lib/config')()

const webpackDir = path.resolve(__dirname)
const rootDir = config.root
const distDir = path.resolve(rootDir, config.paths.dist.dir)

function getEntries() {
    const entries = {};

    const patterns = {
        'baseComponents': config.paths.baseComponents,
        'src.js': config.paths.src.js,
    }

    for (const key in patterns) {
        if (!patterns.hasOwnProperty(key)) {
            continue
        }

        let pattern = path.resolve(rootDir, patterns[key], '**/!(*.stories|*.component|*.min|*.test).js')

        glob.sync(pattern).forEach((file) => {
            const filePath = file.split(patterns[key] + '/')[1]

            if (!filePath.contains('/dist/')) {
                const newfilePath = `${config.paths.dist.js}/${filePath.replace('.js', '')}`
                entries[newfilePath] = file;
            }
        });
    }

    entries.svgSprite = rootDir + '/webpack/svgSprite.js'
    entries.css = rootDir + '/webpack/css.js'

    return entries;
}

let activeRules = []
let activePlugins = [
    plugins.ProgressPlugin,
    plugins.CleanWebpackPlugin,
]

if (config.sass.enabled) {
    activeRules.push(loaders.CSSLoader)
    activePlugins.push(plugins.MiniCssExtractPlugin)
}

if (config.icons.enabled) {
    activeRules.push(loaders.SVGSpriteLoader)
    activePlugins.push(plugins.SpriteLoaderPlugin)
}

if (config.images.imageminEnabled) {
    activePlugins.push(plugins.ImageminPlugin)
}

if (config.images.loadImages) {
    activeRules.push(loaders.ImageLoader)
}

if (config.scripts.enabled) {
    activeRules.push(loaders.JSLoader)
}

module.exports = {
    stats: {
        errorDetails: true,
    },
    entry: getEntries(),
    module: {
        rules: activeRules,
    },
    plugins: activePlugins,
    output: {
        path: distDir,
        filename: '[name].js',
    },
};
