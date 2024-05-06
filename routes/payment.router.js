const express = require("express");
const router = express.Router();
const paymentController = require('../controller/payment.controller')

router.post("/pay",paymentController.createpayment);

router.delete("/pay/:id",paymentController.deletepayment);


module.exports = router;