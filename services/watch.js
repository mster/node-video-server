'use strict'

const fs = require('fs');
const path = require('path');
const handlers = require('../handlers/watch');

module.exports = async function(fastify, opts) {
    fastify.setNotFoundHandler(function notFoundHandler (req, reply) {
        reply
        .code(404)
        .type("application/json")
        .send({ message: "Requested resource not found."});
    })

    fastify.get(
        '/',
        {},
        handlers.local
    )

    fastify.get(
        '/s3',
        {},
        handlers.s3
    )
}

module.exports.autoPrefix = '/watch';
