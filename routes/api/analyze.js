'use strict'

const {
  analyzeRepository
} = require('../../lib/repository-scanner')

module.exports = async function (fastify) {
  fastify.post(
    '/analyze',
    {
      schema: {
        body: {
          type: 'object',
          additionalProperties: false,

          required: [
            'path'
          ],

          properties: {
            path: {
              type: 'string',
              minLength: 1
            }
          }
        }
      }
    },

    async function (request, reply) {
      try {
        const {
          path: projectPath
        } = request.body

        const result =
          await analyzeRepository(projectPath)

        return {
          success: true,
          data: result
        }
      } catch (error) {
        request.log.error(error)

        return reply
          .code(400)
          .send({
            success: false,
            error: error.message
          })
      }
    }
  )
}