'use strict'

const { default: fastify } = require("fastify");
/*
    Handles uploading of media.
*/

const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

module.exports.local = async function (req, reply) {

    if (!req.headers["media-name"] || req.headers["media-name"].length === 0) {
        reply
        .code(400)
        .type("application/json")
        .send({ error: "Invalid headers: 'media-name' required." });

        return;
    }

    const mediaName = req.headers["media-name"]
    const uuid = uuidv4();

    const writeStream = fs.createWriteStream(path.join(__dirname, "..", "video", `${uuid}.mp4`));
    req.raw.pipe(writeStream);

    this.LUT.set(mediaName, `${uuid}.mp4`);

    reply
    .code(200)
    .type("application/json")
    .send({ msg: `Upload successful -- ${mediaName}=${uuid}.mp4`})
}

module.exports.s3 = async function (req, reply) {
    if (!req.headers["media-name"] || req.headers["media-name"].length === 0) {
        reply
        .code(400)
        .type("application/json")
        .send({ error: "Invalid headers: 'media-name' required." });

        return;
    }

    req.raw.on('error', function (err) {
        console.error(err);
        process.exit(3);
    })

    const mediaName = req.headers["media-name"]
    const uuid = uuidv4();

    const uploadParams = {
        Bucket: process.env.S3_BUCKET,
        Key: `${mediaName}.mp4`,
        Body: req.raw
    }

    this.s3.upload(uploadParams, function (err, data) {
        if (err) {
            reply
            .code(400)
            .type("application/json")
            .send({ msg: `Upload to S3 failed -- ${mediaName}.mp4`})

        }
        else {
            reply
            .code(200)
            .type("application/json")
            .send({ msg: `Upload successful -- ${mediaName}.mp4`}) 
        }
    })
}