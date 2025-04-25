const express = require("express");
const router = express.Router();
const participationController = require("../controllers/participationController");

router.get("/:eventId", participationController.getParticipents);
router.post("/", participationController.createParticipent);
router.delete("/:userId/:eventId", participationController.removeParticipent);
router.get("/users/:userId", participationController.getParticpentsEvents);
router.patch("/:userId/:eventId", participationController.checkIn);
router.get("/users/history/:userId", participationController.getParticpentsHistory);



module.exports = router;