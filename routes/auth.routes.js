const express = require("express");
const { register, signin, signout } = require("../controllers/auth.controller");
const router = express.Router();

router.post("/register", register);

router.post("/signin", signin);

router.get("/signout", signout);

router.post("/forgot-password", (req, res) => {});
router.post("/reset-password", (req, res) => {});

module.exports = router;

// Schema -> Structure and Validation
// Model ->
// CRUD
