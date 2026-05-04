const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, enum: ['Frontend', 'Backend', 'Tools', 'Other'], default: 'Other' },
    level: { type: String } // e.g., Beginner, Intermediate, Advanced
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);
