const mongoose = require('mongoose');

const Task = mongoose.Schema(
    {
        _id: { type: Number, required: true},
        name: { type: String, required: true },
        date: { type: Date, required: true },
        description: { type: String, required: false }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('task', Task);