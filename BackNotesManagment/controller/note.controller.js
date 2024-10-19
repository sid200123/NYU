const Note = require("../models/noteModel");
const { Parser } = require('json2csv')
require("dotenv").config()

const exportNotes = async (req,res) => {
    try{
        const notes = await Note.find();

        const fields = ['title', 'author'];
        const csv = new Parser({ fields });

        const csvData = csv.parse(notes);

        res.header('Content-Type', 'text/csv');
        res.attachment('notes.csv')

        res.status(201).send(csvData);

    }catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })   
    }
}

const getNotes = async (req, res) => {
    try {
        const {page, limit} = req.body;

        console.log(req.body)

        const skip = (page - 1) * limit;
        const notes = await Note.find().skip(skip).limit(limit);

        const total = await Note.countDocuments()

        const hasNext = skip + notes.length < total;
        const hasPrev = page > 1;

        res.json({
            total,
            notes,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            prev: hasPrev,
            next: hasNext

        });
    }catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })   
    }
}

const addNote = async (req, res) => {
    try {
        const note = new Note(req.body);
        await note.save();

        res.status(201).json({ message: "Note Added SuccessFully" });
    }catch(err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
}

const editNote = async (req, res) => {
    try {
        await Note.updateOne({_id: req.params.noteID}, req.body);

        res.status(201).json({ message: "Note Updated SuccessFully" });
    }catch(err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
}

const deleteNote = async (req, res) => {
    try {
        await Note.findByIdAndDelete({_id: req.params.noteID});
        res.status(201).json({ message: "Note Deleted SuccessFully" });
    }catch(err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
}


module.exports = {
    exportNotes,
    getNotes,
    addNote,
    editNote,
    deleteNote
}