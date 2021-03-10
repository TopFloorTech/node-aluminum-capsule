const path = require('path')
const fs = require('fs')
const mergeOptions = require('merge-options')
const shelljs = require('shelljs')

module.exports = function (configFile, localConfigFile) {
    let themeRoot = shelljs.pwd().toString()
    // console.log('Theme root: ' + themeRoot);
    configFile = path.normalize(configFile || path.join(themeRoot, './aluminum.json'))
    localConfigFile = path.normalize(localConfigFile || path.join(themeRoot, './aluminum.local.json'))
    let defaultConfigFile = path.normalize(path.join(__dirname, '../default.aluminum.json'))
    let config = require(defaultConfigFile)

    try {
        fs.accessSync(configFile)
        config = mergeOptions(config, require(configFile))
    } catch (e) {
        console.log('Could not access aluminum.json in your project directory. Using the defaults.')
        // console.log(e)
    }

    try {
        fs.accessSync(localConfigFile)
        config = mergeOptions(config, require(localConfigFile))
    } catch (e) {
        // Ignore any issues loading the local config file.
    }

    config.root = themeRoot

    return config
}
