const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SecretSchema = new Schema({
    message: {
        type: String,
        trim: true,
        default: 'the skyline is lit and as is well'
    }
})

let Secret = mongoose.model('Secret', SecretSchema)

module.exports = Secret