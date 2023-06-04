const app = require('./app')
const config = require('./utils/config')
const log = require('./utils/log')

app.listen(config.PORT, () => {
  log.info(`Server running on port ${config.PORT}`)
})
