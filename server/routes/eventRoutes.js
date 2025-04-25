const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
router.get("/", eventController.getAllEvents);
router.get("/:eventId", eventController.getEvent);
router.post("/", eventController.createEvent);
router.delete("/:eventId", eventController.removeEvent);
module.exports = router;