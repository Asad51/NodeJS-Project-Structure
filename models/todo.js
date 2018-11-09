var mongoose = require('mongoose');

var todoSchema = mongoose.Schema({
    title: { type: String, required: true },
    created_at: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('todo', todoSchema);