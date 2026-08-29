'use strict'

module.exports = async function (fastify) {
  fastify.get('/health', async function () {
    return {
      status: 'ok',
      service: 'flowlyra-api',
      timestamp: new Date().toISOString()
    }
  })
}
