const express = require("express");
const { register } = require("../controllers/authController");

const router = express.Router();

router.get("", (req, res) => {
  res.send("auth test");
});
router.post("/register", register);
module.exports = { router };
