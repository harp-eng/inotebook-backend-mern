const Notes = require("../models/Notes");

const getNotes = async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id }).sort({ date: -1 });
    return res.json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const createNote = async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const note = await Notes.create({
      title,
      description,
      tag,
      user: req.user.id,
    });

    return res.status(201).json(note);
  } catch (error) {
    console.error("Error creating note:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const updateNote = async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const updatedFields = {};

    if (title !== undefined) updatedFields.title = title;
    if (description !== undefined) updatedFields.description = description;
    if (tag !== undefined) updatedFields.tag = tag;

    let note = await Notes.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(403).json({ error: "Not allowed" });
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: updatedFields },
      { new: true, runValidators: true },
    );

    return res.json(note);
  } catch (error) {
    console.error("Error updating note:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const deleteNote = async (req, res) => {
  try {
    const note = await Notes.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(403).json({ error: "Not allowed" });
    }

    await Notes.findByIdAndDelete(req.params.id);

    return res.json({ success: true });
  } catch (error) {
    console.error("Error deleting note:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
};
