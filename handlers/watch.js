'use strict'

/* 
    Serving up videos.
*/

const fs = require("fs");
const path = require("path");

module.exports = async function handleWatch (req, reply) {
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