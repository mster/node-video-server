'use strict'

const fs = require('fs');
const path = require('path');
const handlers = require('../handlers/upload');

module.exports = async function(fastify, opts) {
    fastify.setNotFoundHandler(function notFoundHandler (req, reply) {
        reply
        .code(404)
        .type("application/json")
        .send({ message: "Requested resource not found."});
    })

    fastify.addContentTypeParser('video/mp4', function (req, payload, done) {
        if (!payload) done(new Error("No payload"));

        done(null, payload);
    })

    fastify.get(
        '/',
        {},
        async function (req) {
            return "welcome to upload city!";
        }
    )

    fastify.post(
        '/new',
        {},
        handlers.local
    )

    fastify.post(
        '/new-s3',
        {},
        handlers.s3
    )


}

module.exports.autoPrefix = '/upload';