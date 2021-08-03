const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    name: { type: String, required: true },
    tasks: [{ type: Types.ObjectId, ref: 'Task'}]
});

module.exports = model('Board', schema)