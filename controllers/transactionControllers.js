const mongoose = require('mongoose');
const Transaction = require('../models/Transaction');
const Order = require('../models/Order');

/*
Implement a controller to create a transaction for an order. The function should receive a request object containing the following parameters: orderId, paymentMethod, and amount. If any of the required fields are missing, the function should return a JSON response with a status code of 400 and the following format:

{
"message": "Missing required fields",
"status": "Error"
}

The function should then start a transaction using mongoose.startSession() and create a new Transaction instance using the provided parameters. It should also update the corresponding Order instance's status to "paid". Both the Transaction and Order instances should be saved to the database within the same transaction using the save() method with the session object as an argument.

After the transaction has been successfully created, the function should commit the transaction using session.commitTransaction() and return a JSON response with a status code of 200 and the following format:

{
"message": "Transaction created successfully",
"status": "Success",
"transaction": <the saved transaction object>
}

If the specified orderId is not found in the database, the function should abort the transaction and return a JSON response with a status code of 404 and the following format:

{
"message": "Order not found",
"status": "Error"
}

If any errors occur during the process, the function should abort the transaction and return a JSON response with a status code of 500 and the following format:

{
"message": "Internal server error",
"status": "Error",
"error": <the error object>
}
*/

const createTransaction = async (req, res) => {
    const { orderId, paymentMethod, amount } = req.body;

    if (!orderId || !paymentMethod || !amount) {
        return res.status(400).json({
            message: "Missing required fields",
            status: "Error"
        });
    }
    
    // start a session here

    try {
        //Write your Code Here
    } catch (err) {
        await session.abortTransaction();
        console.log(err);
        return res.status(500).json({
            message: "Internal server error",
            status: "Error",
            error: err
        });
    } finally {
        session.endSession();
    }
};

/*
Input: 
{
    "orderId": "640ed9f8685a0739ddc1c74a",
    "amount": "50",
    "paymentMethod": "credit card"
}

Output:
{
    "message": "Transaction created successfully",
    "status": "Success",
    "transaction": {
        "_id": "640eed925b1866e31551f673",
        "order": "640ed9f8685a0739ddc1c74a",
        "paymentMethod": "credit card",
        "amount": 50,
        "createdAt": "2023-03-13T09:32:02.062Z",
        "__v": 0
    }
}
*/

const getTransactionById = async (req, res) => {
    const { id } = req.params;

    try {
        const transaction = await Transaction.findById(id);

        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found",
                status: "Error"
            });
        }

        return res.status(200).json({
            message: "Transaction retrieved successfully",
            status: "Success",
            transaction
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error",
            status: "Error",
            error: err
        });
    }
};

module.exports = {
    createTransaction,
    getTransactionById
};
