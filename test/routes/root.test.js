'use strict'

const { test } = require('node:test')
const assert = require('node:assert')
const { build } = require('../helper')

test('default root route', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    url: '/'
  })
  const body = JSON.parse(res.payload)

  assert.equal(res.statusCode, 200)
  assert.equal(body.name, 'Flowlyra API')
  assert.equal(body.endpoints.analyze, 'POST /api/analyze')
  assert.equal(body.endpoints.trace, 'POST /api/trace')
})
