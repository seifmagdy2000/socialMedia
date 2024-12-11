const express = require("express");
const {
  updateUserinfo,
  deleteUser,
  getUser,
  followUser,
} = require("../controllers/userController");
const authenticate = require("../../middleware/authMiddleware");

const router = express.Router();

router.put("/update/:id", authenticate, updateUserinfo);
router.delete("/delete/:id", authenticate, deleteUser);
router.get("/get/:id", getUser);
router.put("/follow/:id", followUser);

module.exports = router;
