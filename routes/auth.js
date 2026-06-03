const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const fetchUser = require("../middleware/auth");
const validateRequest = require("../middleware/validateRequest");
const {
  registerUser,
  loginUser,
  getCurrentUser,
} = require("../controllers/authController");

const registerValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

const loginValidation = [
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

router.post(
  "/register",
  registerValidation,
  validateRequest,
  registerUser,
);

router.post("/createuser", registerValidation, validateRequest, registerUser);

router.post(
  "/login",
  loginValidation,
  validateRequest,
  loginUser,
);

router.get("/user", fetchUser, getCurrentUser);
router.get("/getuser", fetchUser, getCurrentUser);

module.exports = router;
