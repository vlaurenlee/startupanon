/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var story = require('./story.model');

exports.register = function(socket) {
  story.schema.post('save', function (doc) {
  	if (doc.status === 'Flagged') {
  		return onFlag(socket, doc);
  	}
    return onSave(socket, doc);
  });
  story.schema.post('delete', function (doc){
  	return onDelete(socket, doc);
  })
}

function onSave(socket, doc, cb) {
  socket.emit('story:save', doc);
}

function onFlag(socket, doc, cb) {
  socket.emit('story:flag', doc);
}

function onDelete(socket, doc, cb) {
  socket.emit('story:delete', doc);
}