'use strict'

const build = require('./build');

const app = build({ logger: true });
const port = process.env.PORT || 3371;

const start = async () => {
    try {
        await app.listen(port);
        app.log.info(`Server listening on port: ${port}`);
    } catch (err) {
        app.log.error(err);
        process.exit(-1);
    }
}

start();