const router = require('express').Router();

router.use('/users', require('./userRoutes'));
router.use('/products', require('./productRoutes'));
router.use('/carts', require('./cartRoutes'));
router.use('/order', require('./orderRoutes'));
router.use('/transactions', require('./transactionRoutes'));

module.exports = router;
