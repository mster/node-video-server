'use strict'

const path = require('path');
const fastify = require('fastify');
const autoload = require('fastify-autoload');
const helmet = require('fastify-helmet');

function build (opts = {}) {
    const app = fastify(opts);

    app.register(autoload, {
        dir: path.join(__dirname, 'plugins'),
        options: Object.assign({}, opts)
    });

    app.register(autoload, {
        dir: path.join(__dirname, 'services'),
        options: Object.assign({}, opts)
    });

    app.register(helmet);

    /* Look-Up Table binding */
    app.decorate('LUT', new Map());

    return app
}

module.exports = build;