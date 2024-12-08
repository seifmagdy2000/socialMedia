const express = require("express");
const {
  updateUserinfo,
  deleteUser,
  getUser,
} = require("../controllers/userController");

const router = express.Router();

router.put("/update/:id", updateUserinfo);
router.delete("/delete/:id", deleteUser);
router.get("/get/:id", getUser);

module.exports = router;
