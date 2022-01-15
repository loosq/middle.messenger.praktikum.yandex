'use strict';

const express = require(`express`);
const path = require(`path`);
const DEFAULT_PORT = 3000;
const STATIC_DIR = 'static';
const app = express();
const {mainRoutes} = require('./routes')
console.log(__dirname+'/'+STATIC_DIR)
app.set(`views`, path.resolve(__dirname, `templates`));
app.use(express.static(path.resolve(__dirname, STATIC_DIR)));
app.set(`view engine`, `pug`);
app.use(express.urlencoded({extended: false}));
app.use((err, req, res, next) => {
    console.error(`Something went wrong`, err);
    next(err);
});
app.use('/', mainRoutes);
app.use((req, res) => res.status(400).render(`pages/errors/404`));
app.use((req, res) => res.status(500).render(`pages/errors/500`));

app.listen(DEFAULT_PORT);