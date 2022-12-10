const express = require("express");
const {
  createTransaction,
  getTransactions,
  getAllTransactions,
} = require("../controllers/transactionController");

const router = express.Router();

//CREATE
router.post("/", createTransaction);

//GET
router.get("/:id", getTransactions);

//GET ALL
router.get("/", getAllTransactions);

module.exports = router;
