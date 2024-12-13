const express = require("express");

const userRoutes = require("./userRoutes");
const authRouter = require("./authRoutes");
const postRouter = require("./postRoutes");

const router = express.Router();

const baseUrl = "api/v1";

router.use(`/${baseUrl}/users`, userRoutes);
router.use(`/${baseUrl}/auth`, authRouter);
router.use(`/${baseUrl}/post`, postRouter);
module.exports = router;
