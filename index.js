module.exports = {
    webpack: {
        'dev': function () {
            return require('./webpack/webpack.dev')
        },
        'prod': function () {
            return require('./webpack/webpack.prod')
        }
    }
}
