const mongoose = require('mongoose');

const SpotSchema = new mongoose.Schema({
    street: {
        type: String,
        required: [true, "The street is required!"],
        minlength: [3, "The street must be 3 characters or more!"]
    },
    crossStreets: {
        crossStreet1: {
            type: String,
            required: [true, "The first cross street is required!"],
            minlength: [3, "The first cross street must have 3 characters or more!"]
        },
        crossStreet2: {
            type: String,
            required: [true, "The second cross street is required!"],
            minlength: [3, "The second cross street must have 3 characters or more!"]
        }
    },
    neighborhood: {
        type: String,
        required: [true, "The neighborhood is required!"],
        minlength: [3, "The neighborhood must be 3 characters or more!"]
    },
    zipCode: {
        type: Number,
        required: [true, "The zip code is required!"],
        minlength: [5, "The zip code must be 5 numbers!"]
    },
    details: {
        type: String,
        required: [true, "Details are required!"]
    },
    latitude: {
        type: Number,
        min: [-90, "Latitude must be -90 or higher!"],
        max: [90, "Latitude must be 90 or lower!"] 
    },
    longitude: {
        type: Number,
        min: [-180, "Longitude must be -180 or higher!"],
        max: [180, "Longitdue must be 180 or lower!"]
    }
}, {timestamps: true})

module.exports = mongoose.model('Spot', SpotSchema)