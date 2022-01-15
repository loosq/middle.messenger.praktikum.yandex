'use strict';

const {Router} = require(`express`);
const mainRouter = new Router();

mainRouter.get(`/`, async (req, res) => {
    res.render(`./pages/chat/chat.pug`);
});

module.exports = mainRouter;
