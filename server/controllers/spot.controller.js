const Spot = require('../models/spot.model')

module.exports.testApi = (req, res) => {
    res.json({Status: 'ok'})
}

// CREATE
module.exports.addSpot = (req, res) => {
    const newSpot = req.body
    Spot.create(newSpot)
        .then(spot => res.json(spot))
        .catch(err => res.status(400).json(err))
}

// READ ALL
module.exports.allSpots = (req, res) => {
    Spot.find()
        .then(spots => res.json(spots))
        .catch(err => res.status(400).json(err))
}

// READ ONE
module.exports.getSpot = (req, res) => {
    Spot.findOne({_id: req.params.id})
    .then(spot => res.json(spot))
    .catch(err => res.status(400).json(err))
    }

// READ ALL BY ZIP CODE
module.exports.getSpotByZipCode = (req, res) => {
    Spot.find({zipCode: req.params.zipCode})
        .then(spots => res.json(spots))
        .catch(err => res.status(400).json(err))
}

// READ ALL BY NEIGHBORHOOD
module.exports.getSpotByNeighborhood = (req, res) => {
    Spot.find({neighborhood: req.params.neighborhood})
        .then(spots => res.json(spots))
        .catch(err => res.status(400).json(err))
}

// UPDATE
module.exports.updateSpot = (req, res) => {
    Spot.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true})
        .then(updatedSpot => res.json(updatedSpot))
        .catch(err => res.status(400).json(err))
}

// DELETE
module.exports.deleteSpot = (req, res) => {
    Spot.deleteOne({_id: req.params.id})
        .then(deleteConfirmation => res.json(deleteConfirmation))
        .catch(err => res.status(400).json(err))
}