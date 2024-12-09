const express = require("express");
const {
  updateUserinfo,
  deleteUser,
  getUser,
} = require("../controllers/userController");
const authenticate = require("../../middleware/authMiddleware");

const router = express.Router();

router.put("/update/:id", authenticate, updateUserinfo);
router.delete("/delete/:id", authenticate, deleteUser);
router.get("/get/:id", getUser);

module.exports = router;
