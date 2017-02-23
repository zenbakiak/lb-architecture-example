const app = require('../../server/server')
const assert = require('assert')
const cleanDB = require('../support/clean-db')
const fixtures = require('../fixtures')

describe('OrderActivity', (done) => {
  let OrderActivity = app.models.OrderActivity
  beforeEach(cleanDB)

  describe('#inTransit', () => {
    it('should be true when status in_transit', done => {
      let params = fixtures.validOrderActivity

      OrderActivity.create(params, (err, res) => {
        if (err) {
          done(err)
        }

        assert(true, res.inTransit())
        done()
      })
    })
  })
})
