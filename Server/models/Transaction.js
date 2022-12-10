const mongoose = require("mongoose");

const TransactionsSchema = mongoose.Schema(
  {
    user_id: {
      type: String,
      ref: "User",
      required: true,
    },
    hotel_id: {
      type: String,
      ref: "Hotel",
      required: true,
    },
    username: {
      type: String,
    },
    hotelName: {
      type: String,
    },
    room: {
      type: Array,
      required: true,
    },
    dateStart: {
      type: Date,
      required: true,
    },
    dateEnd: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    payment: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Transaction", TransactionsSchema);
