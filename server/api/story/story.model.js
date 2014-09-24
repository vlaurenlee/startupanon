'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StorySchema = new Schema({
	score: { type: Number, default: 0 },
	body: String,
	status: { type: String, default: 'Submitted' },
	submitted: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Story', StorySchema);