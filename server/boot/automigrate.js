'use strict'

module.exports = function migrate (server) {
  // Warning: Possible EventEmitter memory leak detected
  var ds = server.dataSources.db
    ds.autoupdate(null, function (err) {
      if (err) throw (err)
    })
}
