const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const {validateJWT} = require('./middleware/validateJWT');

// router.get("/", userController.getUsers());
router.post("/", userController.createUser);
router.get("/", userController.getUsers);
router.get("/:userId", userController.getUser);
router.patch("/:userId", userController.updateUser)
module.exports = router;