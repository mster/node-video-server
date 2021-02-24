'use strict'

const fastifyPlugin = require('fastify-plugin');
const { Client } = require('pg');

async function pg (fastify, opts) {

    const pg = new Client();

    try {
        await pg.connect();

        fastify.log.info('Postgres connected.');
        fastify.decorate('pg', pg);
        
    } catch (pgError) {
        fastify.log.error(pgError);

        process.exit(2);
    }

}

module.exports = fastifyPlugin(pg);
