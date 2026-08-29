'use strict'

module.exports = async function (fastify) {
  fastify.get('/', async function () {
    return {
      name: 'Flowlyra API',

      tagline:
        'Understand features, not files.',

      status: 'running',

      version: '0.1.0',

      endpoints: {
        health:
          'GET /health',

        analyze:
          'POST /api/analyze',

        trace:
          'POST /api/trace'
      }
    }
  })
}