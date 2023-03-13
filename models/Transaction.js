const mongoose = require('mongoose');
/*
Implement a Mongoose model for transactions that includes the following fields: order, paymentMethod, amount, and createdAt. The order field should reference the Order model, and all fields are required.

The model should also include a static method called createTransaction, which should accept four parameters: order, paymentMethod, amount, and session. The method should create a new transaction instance using the provided parameters and save it to the database using the transaction.save() method.

The createTransaction method should be called within a session to ensure atomicity of the transaction, and it should return a promise that resolves with the saved transaction instance.
*/

const transactionSchema = new mongoose.Schema({
  // Write your code here
});

transactionSchema.statics.createTransaction = async function (order, paymentMethod, amount, session) {
  //Write your code here
};

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
