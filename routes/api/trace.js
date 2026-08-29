'use strict'

const {
  searchFeature
} = require('../../lib/repository-scanner')

module.exports = async function (fastify) {
  fastify.post(
    '/trace',
    {
      schema: {
        body: {
          type: 'object',
          additionalProperties: false,

          required: [
            'path',
            'feature'
          ],

          properties: {
            path: {
              type: 'string',
              minLength: 1
            },

            feature: {
              type: 'string',
              minLength: 2,
              maxLength: 200
            }
          }
        }
      }
    },

    async function (request, reply) {
      try {
        const {
          path: projectPath,
          feature
        } = request.body

        const result =
          await searchFeature(
            projectPath,
            feature
          )

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