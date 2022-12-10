const express = require("express");
const {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getAllHotel,
  countByCity,
  countByType,
  getHotelRooms,
} = require("../controllers/hotelController");

const { verifyAdmin } = require("../utils/decentralization");
const { verifyToken } = require("../utils/verifyToken");

const router = express.Router();

//CREATE
router.post("/", createHotel);

//UPDATE
router.put("/:id", verifyToken, verifyAdmin, updateHotel);

//DELETE
router.delete("/:id", deleteHotel);

//GET
router.get("/find/:id", getHotel);

//GET ALL
router.get("/", getAllHotel);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);

module.exports = router;
