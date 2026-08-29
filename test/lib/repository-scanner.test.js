'use strict'

const path = require('node:path')
const { test } = require('node:test')
const assert = require('node:assert')
const { analyzeRepository, searchFeature } = require('../../lib/repository-scanner')

const sampleApp = path.join(__dirname, '..', '..', 'fixtures', 'sample-app')

test('analyzeRepository lists languages and project metadata', async () => {
  const result = await analyzeRepository(sampleApp)

  assert.equal(result.project.name, 'sample-app')
  assert.ok(result.summary.totalFiles >= 4)
  assert.ok(result.languages.some((language) => language.name === 'JavaScript'))
})

test('analyzeRepository rejects a missing path', async () => {
  await assert.rejects(
    () => analyzeRepository(path.join(sampleApp, 'missing')),
    { message: /does not exist/ }
  )
})

test('searchFeature returns keyword matches with evidence', async () => {
  const result = await searchFeature(sampleApp, 'user login')

  assert.equal(result.query, 'user login')
  assert.equal(result.mode, 'keyword-prototype')
  const files = result.matches.map((match) => match.file)
  assert.ok(files.includes('src/login-page.js'))
  assert.ok(files.includes('src/user-repository.js'))
})
