const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    id: { type: Number, unique: true, required: true },
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    age: { type: Number, unique: false, required: false },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true }
});

module.exports = mongoose.model('client', clientSchema);