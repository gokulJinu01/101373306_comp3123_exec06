const express = require('express');
const noteModel = require('../models/NotesModel');

const app = express();

// Create a new Note
app.post('/notes', (req, res) => {
    if (!req.body.noteTitle || !req.body.noteDescription) {
        return res.status(400).send({
            message: "Note title and description can not be empty"
        });
    }

    const note = new noteModel({
        noteTitle: req.body.noteTitle,
        noteDescription: req.body.noteDescription,
        priority: req.body.priority || 'MEDIUM'
    });

    note.save()
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send({ message: err.message }));
});

// Retrieve all Notes
app.get('/notes', (req, res) => {
    noteModel.find()
        .then(notes => res.status(200).send(notes))
        .catch(err => res.status(500).send({ message: err.message }));
});

// Retrieve a single Note with noteId
app.get('/notes/:noteId', (req, res) => {
    const noteId = req.params.noteId;
    noteModel.findById(noteId)
        .then(note => {
            if (!note) {
                return res.status(404).send({ message: "Note not found with id " + noteId });
            }
            res.status(200).send(note);
        })
        .catch(err => res.status(500).send({ message: err.message }));
});

// Update a Note with noteId
app.put('/notes/:noteId', (req, res) => {
    const noteId = req.params.noteId;
    const updateData = {
        noteTitle: req.body.noteTitle,
        noteDescription: req.body.noteDescription,
        priority: req.body.priority,
        dateUpdated: Date.now()
    };

    noteModel.findByIdAndUpdate(noteId, updateData, { new: true })
        .then(updatedNote => {
            if (!updatedNote) {
                return res.status(404).send({ message: "Note not found with id " + noteId });
            }
            res.status(200).send(updatedNote);
        })
        .catch(err => res.status(500).send({ message: err.message }));
});

// Delete a Note with noteId
app.delete('/notes/:noteId', (req, res) => {
    const noteId = req.params.noteId;
    noteModel.findByIdAndDelete(noteId)
        .then(deletedNote => {
            if (!deletedNote) {
                return res.status(404).send({ message: "Note not found with id " + noteId });
            }
            res.status(200).send({ message: "Note deleted successfully!" });
        })
        .catch(err => res.status(500).send({ message: err.message }));
});

module.exports = app; // Make sure to export your routes
