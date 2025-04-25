const express = require("express");
const router = express.Router();
const avaliabilityController = require("../controllers/avaliabilityController");

router.get("/:userId", avaliabilityController.getUserAvailablity);
router.post("/", avaliabilityController.createAvailabilty);
router.patch("/:userId", avaliabilityController.UpdateAvailablity);

module.exports = router;
