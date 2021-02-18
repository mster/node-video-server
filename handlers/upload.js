'use strict'

/*
    Handles uploading of media.
*/

const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

module.exports = async function handleUpload (req, reply) {

    if (!req.headers["media-name"] || req.headers["media-name"].length === 0) {
        reply
        .code(400)
        .type("application/json")
        .send({ error: "Invalid headers: 'media-name' required." });
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