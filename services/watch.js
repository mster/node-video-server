'use strict'

const fs = require('fs');
const path = require('path');

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
        require("../handlers/watch")
    )
}

module.exports.autoPrefix = '/watch';
