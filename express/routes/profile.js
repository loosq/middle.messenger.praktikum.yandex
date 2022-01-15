'use strict';

const {Router} = require(`express`);
const profileRoutes = new Router();

profileRoutes.get(`/`, async (req, res) => {
    res.render(`./pages/profile/profile.pug`);
});

module.exports = profileRoutes;
