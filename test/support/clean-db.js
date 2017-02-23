const pg = require('pg')
const DatabaseCleaner = require('database-cleaner')
const dbConfigs = require('../../server/datasources.test')

const cleanDB = (cb) => {
  let cleanerConfig = {postgresql: {strategy: 'truncation', skipTables: []}}
  let databaseCleaner = new DatabaseCleaner('postgresql', cleanerConfig)
  let connString = dbConfigs.db.url

  pg.connect(connString, (err, client, release) => {
    if (err) {
      return cb(err)
    }

    databaseCleaner.clean(client, () => {
      release()
      cb()
    })
  })
}

module.exports = cleanDB
