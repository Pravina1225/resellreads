const express = require("express");
const router = express.Router();
const messageController = require('../controller/message.controller')


router.get("/allmessage",messageController.getAllMessage);
router.get("/getbyid/:id",messageController.getMessageById);


router.post("/store",messageController.createmessage);
router.put("/update/:id",messageController.updatemessage);
router.delete("/delete/:id",messageController.deletemessage);


module.exports = router;