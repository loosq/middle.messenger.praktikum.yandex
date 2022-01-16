'use strict';

const express = require(`express`);
const path = require(`path`);
const app = express();
const {DEFAULT_PORT, BUILD_PATH} = require('./constants');

app.use('/', express.static(path.join(__dirname, BUILD_PATH)));
app.use((err, req, res, next) => {
    console.error(`Something went wrong`, err);
    next(err);
});
app.get(`/`, (req, res) => res.sendFile(`${__dirname}/dist/chat.html`));
app.get(`/profile`, (req, res) => res.sendFile(`${__dirname}/dist/profile.html`));

app.listen(DEFAULT_PORT);
