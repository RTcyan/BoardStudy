const { Schema, Types, model } = require('mongoose');

const schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: Number, default: 0 },
    board: { type: Types.ObjectId, ref: 'Board', require: true },
});

module.exports = model('Task', schema);