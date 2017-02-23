const url = 'http://localhost:3000/api'
const supertest = require('supertest')
const cleanDB = require('../support/clean-db')
const fixtures = require('../fixtures')
const agent = supertest(url)

describe('API/User', () => {
  beforeEach(cleanDB)

  describe('POST #create', () => {
    it('should create user with valid params', (done) => {
      let params = fixtures.validUser

      agent.post('/Users')
        .type('json')
        .send(params)
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err)
          }
          done()
        })
    })

    it('should return error with invalid params', (done) => {
      let params = fixtures.invalidUser

      agent.post('/Users')
        .type('json')
        .send(params)
        .expect(422)
        .end((err, res) => {
          if (err) {
            return done(err)
          }
          done()
        })
    })
  })
})
