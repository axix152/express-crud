var mongoose = require('mongoose')

const Schema = mongoose.Schema
const objectId = Schema.Types.ObjectId


var user = new Schema({
    _id: objectId,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        default: '',
    },
    lastName: {
        type: String,
        default: '',
    },
    phone: String,
})

var user = new mongoose.model('User', user)
module.exports = user