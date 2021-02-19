'use strict'

/* 
    Serving up videos.
*/

const fs = require("fs");
const path = require("path");

module.exports.local = async function (req, reply) {
    if (!req?.query?.v) {
        reply.code(400)
        .type("application/json")
        .send({ message: "Invalid syntax"});
    }

    const videoId = req.query.v;
    const uuid = this.LUT.get(videoId);
    const videoPath = path.join(__dirname, "..", "video", uuid);

    try {
        const stat = await fs.promises.stat(videoPath);
    } catch (err) {
        reply.code(404)
        .type("application/json")
        .send({ message: `Requested resource not found. LUT=${videoId}`});

        return;
    }

    const readStream = fs.createReadStream(videoPath);
    reply
    .code(200)
    .type("video/mp4")
    .send(readStream);
}

module.exports.s3 = function (req, reply) {
    if (!req?.query?.v) {
        reply.code(400)
        .type("application/json")
        .send({ message: "Invalid syntax"});
    }

    const videoId = req.query.v;

    const getParams = {
        Bucket: process.env.S3_BUCKET,
        Key: `${req.query.v}.mp4`
    }

    this.s3.getObject(getParams, function (s3Error, data) {
        if (s3Error) {
            console.error(s3Error);

            reply
            .code(500)
            .type("application/json")
            .send({ error: "Unable to GET asset from S3 Bucket"});

            return;
        }

        if (data?.Body) {
            reply
            .code(200)
            .type("video/mp4")
            .send(data.Body)
        } else {
            reply
            .code(204)
            .type("application/json")
            .send({ msg: "No content"});
        }
    })
}