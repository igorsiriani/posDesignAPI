const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const petSchema = new Schema({
    id: { type: Number, unique: true, required: true },
    name: { type: String, required: true },
    ownerId: { type: Number, required: true },
    age: { type: Number, unique: false, required: false },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true }
});

module.exports = mongoose.model('pet', petSchema);