const loopbackApiTesting = require('../support/api-tester')
const tests = require('./api-tests-schema.json')
const server = require('../../server/server.js')
const url = 'http://localhost:3000/api'

loopbackApiTesting.run(tests, server, url, (err) => {
  if (err) {
    console.log(err)
  }
})
