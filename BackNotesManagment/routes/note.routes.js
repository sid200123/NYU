const router = require('express').Router();
const noteController = require("../controller/note.controller");
const isAuthenticated = require("../middlewear/isAuthenticated")

router.route("/export").post(isAuthenticated, noteController.exportNotes)
router.route("/getNote").post(isAuthenticated, noteController.getNotes)
router.route("/addNote").post(isAuthenticated, noteController.addNote)
router.route("/updateNote/:noteID").put(isAuthenticated, noteController.editNote)
router.route("/deleteNote/:noteID").delete(isAuthenticated, noteController.deleteNote)

module.exports = router;