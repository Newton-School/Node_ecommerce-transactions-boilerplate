const express = require("express");

// Importing the controller functions.
const { createTransaction,
    getTransactionById } = require('../controllers/transactionControllers');

const router = express.Router();

router.post('/', createTransaction)
router.get('/', getTransactionById);

module.exports = router