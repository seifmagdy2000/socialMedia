const express = require("express");

const userRoutes = require("./userRoutes");

const router = express.Router();

const baseUrl = "api/v1";

router.use(`/${baseUrl}/users`, userRoutes.router);
router.use(`/${baseUrl}/auth`, userRoutes.router);

module.exports = { router };
