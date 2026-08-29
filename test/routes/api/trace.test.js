'use strict'

const path = require('node:path')
const { test } = require('node:test')
const assert = require('node:assert')
const { build } = require('../../helper')

const sampleApp = path.join(__dirname, '..', '..', '..', 'fixtures', 'sample-app')

test('POST /api/trace returns files matching the feature', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    method: 'POST',
    url: '/api/trace',
    headers: { 'content-type': 'application/json' },
    payload: {
      path: sampleApp,
      feature: 'user login'
    }
  })

  assert.equal(res.statusCode, 200)
  const body = JSON.parse(res.payload)
  assert.equal(body.success, true)
  assert.equal(body.data.query, 'user login')
  assert.equal(body.data.mode, 'keyword-prototype')
  const files = body.data.matches.map((match) => match.file)
  assert.ok(files.includes('src/login-page.js'))
  assert.ok(files.includes('src/user-repository.js'))
  assert.ok(files.includes('src/routes/login.js'))
})

test('POST /api/trace rejects a missing feature', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    method: 'POST',
    url: '/api/trace',
    headers: { 'content-type': 'application/json' },
    payload: { path: sampleApp }
  })

  assert.equal(res.statusCode, 400)
})
