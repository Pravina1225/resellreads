const express = require("express");
const router = express.Router();
const profileController = require('../controller/user.controller')

router.post("/storeprofile",profileController.createprofile);
router.put("/add/:id",profileController.updateprofile);
router.delete("/add/:id",profileController.deleteprofile);


module.exports = router;
