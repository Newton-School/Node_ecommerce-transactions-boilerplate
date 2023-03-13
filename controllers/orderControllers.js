const Product = require('../models/Product');
const User = require('../models/User');
const Cart = require('../models/Cart');
const Order = require('../models/Order');


const placeOrder = async (req, res) => {
    const { userId, products, shippingAddress, paymentMethod } = req.body;

    if (!userId || !products || !shippingAddress || !paymentMethod) {
        return res.status(400).json({
            message: "Missing required fields",
            status: "Error"
        });
    }

    try {
        const order = new Order({
            user: userId,
            products: products.map(item => ({
                product: item.productId,
                quantity: item.quantity
            })),
            shippingAddress,
            paymentMethod
        });


        let totalPrice = 0;
        for (const item of products) {
            console.log(item.product);
            const prod = await Product.findById(item.product);
            console.log(prod);
            totalPrice += prod.price * item.quantity;
        }
        order.totalPrice = totalPrice;


        await order.save();

        // Remove products from cart
        const cart = await Cart.findOne({ user: userId });
        if (cart) {
            await cart.updateOne({
                $pull: {
                    products: {
                        product: { $in: products.map(item => item.productId) }
                    }
                }
            });
        }

        return res.status(200).json({
            message: "Order placed successfully",
            status: "Success",
            order
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


const showAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user').populate('products.product');
        return res.status(200).json({
            message: 'All orders fetched successfully',
            status: 'Success',
            orders,
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Internal server error',
            status: 'Error',
            error: err,
        });
    }
};

module.exports = { placeOrder, showAllOrders }

/*
Input: 
{
  "userId": "614f3a3e86c7b0f9b8f0fde1",
  "products": [
    {
      "product": "614f3a3e86c7b0f9b8f0fde2",
      "quantity": 2
    },
    {
      "product": "614f3a3e86c7b0f9b8f0fde3",
      "quantity": 1
    }
  ],
  "shippingAddress": "123 Main St",
  "paymentMethod": "credit card"
}
*/

/*
Output: 
{
    "message": "Order placed successfully",
    "status": "Success",
    "order": {
        "totalPrice": 4497,
        "status": "pending",
        "_id": "640ed9f8685a0739ddc1c74a",
        "user": "640ed1cab8f0599317a7b79a",
        "products": [
            {
                "quantity": 2,
                "_id": "640ed9f8685a0739ddc1c74b"
            },
            {
                "quantity": 1,
                "_id": "640ed9f8685a0739ddc1c74c"
            }
        ],
        "shippingAddress": "123 Main St",
        "paymentMethod": "credit card",
        "createdAt": "2023-03-13T08:08:30.959Z",
        "updatedAt": "2023-03-13T08:08:30.959Z",
        "__v": 0
    }
}
*/