const express = require("express");
const {
  updateUser,
  deleteUser,
  getUser,
  getAllUser,
} = require("../controllers/userController");
const { verifyUser, verifyAdmin } = require("../utils/decentralization");
const { verifyToken } = require("../utils/verifyToken");

const router = express.Router();

//UPDATE
router.put("/:id", verifyToken, verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyToken, verifyUser, deleteUser);

//GET
router.get("/:id", verifyToken, verifyUser, getUser);

//GET ALL
router.get("/", getAllUser);

module.exports = router;
