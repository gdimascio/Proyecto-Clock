
const express = require ("express");
const router = express.Router();
const controller = require ("../controllers/controller");

router.post("/login", controller.nose);

module.exports = router;