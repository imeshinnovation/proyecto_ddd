const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { verifyToken } = require("../libs/helpers");

// Make Admin Global
userController.adminMaster();

router.get("/users", verifyToken, userController.getUsers);
router.get("/users/findid/:id", verifyToken, userController.getOneUserbyId);
router.get("/users/findemail/:email", userController.getOneUserbyEmail);
router.post("/users", verifyToken, userController.addUser);
router.put("/users", verifyToken, userController.updUser);
router.delete("/users", verifyToken, userController.deleteUser);

router.post("/login", userController.login);

module.exports = router