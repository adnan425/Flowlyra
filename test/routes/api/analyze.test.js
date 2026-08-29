'use strict'

const path = require('node:path')
const { test } = require('node:test')
const assert = require('node:assert')
const { build } = require('../../helper')

const sampleApp = path.join(__dirname, '..', '..', '..', 'fixtures', 'sample-app')

test('POST /api/analyze scans a repository', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    method: 'POST',
    url: '/api/analyze',
    headers: { 'content-type': 'application/json' },
    payload: { path: sampleApp }
  })

  assert.equal(res.statusCode, 200)
  const body = JSON.parse(res.payload)
  assert.equal(body.success, true)
  assert.equal(body.data.project.name, 'sample-app')
  assert.equal(body.data.project.path, path.resolve(sampleApp))
  assert.ok(body.data.summary.totalFiles >= 4)
  assert.ok(body.data.languages.some((language) => language.name === 'JavaScript'))
})

test('POST /api/analyze rejects a missing path', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    method: 'POST',
    url: '/api/analyze',
    headers: { 'content-type': 'application/json' },
    payload: {}
  })

  assert.equal(res.statusCode, 400)
})

test('POST /api/analyze returns an error for a missing repository', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    method: 'POST',
    url: '/api/analyze',
    headers: { 'content-type': 'application/json' },
    payload: { path: path.join(sampleApp, 'does-not-exist') }
  })

  assert.equal(res.statusCode, 400)
  const body = JSON.parse(res.payload)
  assert.equal(body.success, false)
})
