'use strict'

const errors = require('http-errors');

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
        async function (req) {
            return "hello world!";
    })
}