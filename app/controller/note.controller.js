const Note = require('../models/note.model.js');

// Create and Save a new data
exports.create = (req, res) => {
    if(!req.body.content) {
        return res.status(400).send({
            message: "fill required field"
        });

}

const note = new Note({
    name: req.body.name,
    img: req.body.img,
    summary: req.body.summary
});

 // Save data in the database
 note.save()
 .then(data => {
     res.send(data);
 }).catch(err => {
     res.status(500).send({
         message: err.message || "Some error occurred while creating new field."
     });
 });
};

// Retrieve and return all data from the database.
exports.findAll = (req, res) => {
    Note.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving data."
        });
    });

};

// Find a single data with a noteId
exports.findOne = (req, res) => {
    Note.findById(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "data not found with id" + req.params.noteId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "data not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving data with id " + req.params.noteId
        });
    });
};

// Update a data identified by the noteId in the request
exports.update = (req, res) => {

    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "fill required field"
        });
    }
    // Find data and update it with the request body
    Note.findByIdAndUpdate(req.params.noteId, {
        name: req.body.name,
        img: req.body.img,
        summary: req.body.summary
        
    }, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "data not found with id " + req.params.noteId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "data not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error updating data with id " + req.params.noteId
        });
    });
};

// Delete a data with the specified noteId in the request
exports.delete = (req, res) => {
    Note.findByIdAndRemove(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "data not found with id " + req.params.noteId
            });
        }
        res.send({message: "data deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "data not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete data with id " + req.params.noteId
        });
    });
};
