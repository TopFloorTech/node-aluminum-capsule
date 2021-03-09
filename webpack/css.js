const config = require('lib/config')()
const path = config.root + '/' + config.paths.src.dir + '/' + config.paths.src.scss + '/app.scss'

require(path)
