const express = require("express");
const { verifyAdmin } = require("../utils/decentralization");
const {
  createRoom,
  updateRoom,
  getRoom,
  getRooms,
  deleteRoom,
  updateRoomAvailability,
} = require("../controllers/roomController");
const { verifyToken } = require("../utils/verifyToken");

const router = express.Router();

//CREATE
router.post("/:hotelid", createRoom);

//UPDATE
router.put("/availability/:id", updateRoomAvailability);
router.put("/:id", verifyToken, verifyAdmin, updateRoom);
//DELETE
router.delete("/:id", deleteRoom);
router.delete("/:id/:hotelId", deleteRoom);
//GET

router.get("/:id", getRoom);
//GET ALL

router.get("/", getRooms);

module.exports = router;
