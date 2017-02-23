const app = require('../../server/server')
const assert = require('assert')
const cleanDB = require('../support/clean-db')
const fixtures = require('../fixtures')

describe('Model/OrderActivity', (done) => {
  describe('#inTransit', () => {
    beforeEach(cleanDB)

    it('should be true when status in_transit', done => {
      let params = fixtures.validOrderActivity

      app.models.OrderActivity.create(params, (err, res) => {
        if (err) {
          done(err)
        }

        assert(false, res.inTransit())
        done()
      })
    })
  })
})
