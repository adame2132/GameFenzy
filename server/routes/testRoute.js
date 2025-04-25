const express = require("express");
const router = express.Router();
const testController = require("../controllers/testController")


router.get("/", testController.getAllUsers);
router.post("/", testController.createUser);
module.exports = router;