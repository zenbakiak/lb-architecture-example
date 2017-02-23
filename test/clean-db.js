const pg = require('pg')
const DatabaseCleaner = require('database-cleaner')

const cleanDB = (cb) => {
  let cleanerConfig = { postgresql: { strategy: 'truncation', skipTables: [] } }
  let databaseCleaner = new DatabaseCleaner('postgresql', cleanerConfig)
  let connString = 'postgres://skydrop_next:next@localhost/skydrop_next_test'

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
