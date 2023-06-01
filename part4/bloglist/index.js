import app from './app.js'
import config from './utils/config.js'
import log from './utils/log.js'

app.listen(config.PORT, () => {
  log.info(`Server running on port ${config.PORT}`)
})
