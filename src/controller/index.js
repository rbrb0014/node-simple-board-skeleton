const { Router } = require('express');
const ctrl = require("./ctrl");
const auth = require("./auth");

const router = Router();

router.use('/auth', auth);

router.get("/", ctrl.indexPage);

module.exports = router;