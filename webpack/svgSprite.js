const config = require('lib/config')()

function requireAll(r) {
  r.keys().forEach(r);
}

requireAll(require.context(config.root + '/' + config.paths.images + '/', true, /\.svg$/));
