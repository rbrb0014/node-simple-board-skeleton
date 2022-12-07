const { Router } = require('express');
const ctrl = require("./ctrl");
const auth = require("./auth");
const article = require("./article");

const router = Router();

router.use('/auth', auth);
router.use("article", article);

router.get("/", ctrl.indexPage);

router.get('/articles/page/:page(\\d+)', ctrl.listArticles);
router.get("/articles", ctrl.latestArticles);

module.exports = router;