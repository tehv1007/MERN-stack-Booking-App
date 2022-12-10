const Transaction = require("../models/Transaction");

exports.createTransaction = async (req, res, next) => {
  const newTransaction = new Transaction(req.body);
  try {
    const savedTransaction = await newTransaction.save();
    res.status(200).json(savedTransaction);
  } catch (error) {
    next(error);
  }
};

exports.getTransactions = async (req, res, next) => {
  try {
    const transaction = await Transaction.find({ user_id: req.params.id });
    res.status(200).json(transaction);
  } catch (err) {
    next(err);
  }
};

exports.getAllTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find()
      .sort({ _id: 1 })
      .limit(req.query.limit);
    res.status(200).json(transactions);
  } catch (err) {
    next(err);
  }
};
