const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const fetchUser = require("../middleware/auth");
const validateRequest = require("../middleware/validateRequest");
const {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} = require("../controllers/notesController");

const createNoteValidation = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
];

const updateNoteValidation = [
  body("title").optional().trim().notEmpty().withMessage("Title cannot be empty"),
  body("description")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Description cannot be empty"),
];

router.get("/", fetchUser, getNotes);
router.get("/fetchallnotes", fetchUser, getNotes);

router.post(
  "/",
  fetchUser,
  createNoteValidation,
  validateRequest,
  createNote,
);

router.post(
  "/addnote",
  fetchUser,
  createNoteValidation,
  validateRequest,
  createNote,
);

router.put(
  "/:id",
  fetchUser,
  updateNoteValidation,
  validateRequest,
  updateNote,
);

router.put(
  "/updatenote/:id",
  fetchUser,
  updateNoteValidation,
  validateRequest,
  updateNote,
);
router.delete("/:id", fetchUser, deleteNote);
router.delete("/deletenote/:id", fetchUser, deleteNote);

module.exports = router;
