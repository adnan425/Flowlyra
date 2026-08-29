'use strict'

const { test } = require('node:test')
const assert = require('node:assert')
const { build } = require('../helper')

test('GET /health', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    url: '/health'
  })
  const body = JSON.parse(res.payload)

  assert.equal(res.statusCode, 200)
  assert.equal(body.status, 'ok')
  assert.equal(body.service, 'flowlyra-api')
  assert.equal(body.timestamp, new Date(body.timestamp).toISOString())
})
