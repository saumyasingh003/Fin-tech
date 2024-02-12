const express = require("express");
const router = express.Router();
const Transaction = require("../models/TransactionModel");

// Create a transaction
router.post("/transactions", async (req, res) => {
  try {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.status(201).send(transaction);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all transactions for a user
router.get("/getTransactions", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json({transactions});
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
