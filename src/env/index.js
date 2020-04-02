
// eslint-disable-next-line default-case
switch (process.env.NODE_ENV) {
  case 'development':
    module.exports = require('./dev.env')
    break
  case 'production':
    module.exports = require('./prod.env')
    break
  default:
    module.exports = require('./dev.env')
}


