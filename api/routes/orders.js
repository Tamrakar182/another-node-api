const express = require('express');
const router = express.Router();

router.get('/', (req,res, next) => {
    res.status(200).json({
        message:"Handling GET requests to /orders"
    })
});

router.post('/', (req,res, next) => {
    res.status(201).json({
        message:"Handling POST requests to /orders"
    })
});

router.get('/:orderId',(req,res,next) => {
        res.status(200).json({
            message: "Order Details",
            orderId: req.params.orderId
        });
});


router.delete('/:orderId',(req,res,next) => {
    res.status(200).json({
        message: 'Order Deleted!'
    });
});

module.exports = router;