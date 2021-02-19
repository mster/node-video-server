'use strict'

const fastifyPlugin = require('fastify-plugin');
const AWS = require('aws-sdk');

async function s3(fastify, options) {
    try {
        AWS.config.update({ 
            region: process.env.S3_REGION,
            accessKeyId: process.env.S3_ACCESS_KEY_ID,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
        });
        const s3 = new AWS.S3();

        fastify.decorate('s3', s3);
    } catch (err) {
        console.error(err);
        process.exit(3);
    }
}

module.exports = fastifyPlugin(s3);