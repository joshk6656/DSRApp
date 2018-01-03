const { upload } = require('bugsnag-sourcemaps')
const { resolve } = require('path')

// using the version property in package.json as the canonical
// application version is a nice way to keep things in sync
const { version } = require('./package.json')
console.log("Version: " + version);

/*upload({
  apiKey: 'ad7522ceb3d158ac7242a4e0ffe18854',
  appVersion: version,
  minifiedUrl: 'http://your.doma.in/static/js/bundle.js',
  sourceMap: resolve(__dirname, '/static/js/bundle.js.map'),
  minifiedFile: resolve(__dirname, '/static/js/bundle.js'),
  overwrite: true
}, cb)*/
