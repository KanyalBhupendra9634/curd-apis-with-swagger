const mongoose = require('mongoose');

const invalidatedTokensSchema = new mongoose.Schema({
    token: { type: String, required: true, unique: true },
}, { timestamps: true,collection: 'invalidatedTokens',
versionKey: false  });

const invalidatedTokens = mongoose.model('invalidatedTokens', invalidatedTokensSchema);

module.exports = invalidatedTokens;
