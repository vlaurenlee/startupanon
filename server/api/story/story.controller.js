/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /stories              ->  index
 * POST    /stories              ->  create
 * GET     /stories/:id          ->  show
 * PUT     /stories/:id          ->  update
 * DELETE  /stories/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Story = require('./story.model');

// Get list of stories that are active
exports.index = function(req, res) {
  Story.find(req.query)
    .exec(function (err, stories) {
      if(err) { return handleError(res, err); }
      return res.json(200, stories);
    });
};

// Get a single story
exports.show = function(req, res) {
  Story.findById(req.params.id, function (err, story) {
    if(err) { return handleError(res, err); }
    if(!story) { return res.send(404); }
    return res.json(story);
  });
};

// Creates a new story in the DB
exports.create = function(req, res) {
  Story.create(req.body, function(err, story) {
    if(err) { return handleError(res, err); }
    return res.json(201, story);
  });
};

// Get list of stories that are active
exports.flag = function(req, res) {
  Story.findById(req.params.id, function (err, story) {
      if(err) { return handleError(res, err); }
      if(!story) { return res.send(404); }
      story.status = 'Flagged';
      story.save(function (err) {
        if (err) { return handleError(res, err); }
        console.log('flagged: ', story);
        return res.send(200);
      });
    });
};

// Get list of stories that are active
exports.upvote = function(req, res) {
   Story.findById(req.params.id, function (err, story) {
      if(err) { return handleError(res, err); }
      if(!story) { return res.send(404); }
      story.score++;
      story.save(function (err) {
        if (err) { return handleError(res, err); }
        console.log('upvoted: ', story);
        return res.send(200);
      });
    });
};

// Get list of stories that are active
exports.downvote = function(req, res) {
   Story.findById(req.params.id, function (err, story) {
      if(err) { return handleError(res, err); }
      if(!story) { return res.send(404); }
      story.score--;
      story.save(function (err) {
        if (err) { return handleError(res, err); }
        console.log('downvoted: ', story);
        return res.send(200);
      });
    });
};


// Updates an existing story in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Story.findById(req.params.id, function (err, story) {
    if (err) { return handleError(res, err); }
    if(!story) { return res.send(404); }
    var updated = _.merge(story, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, story);
    });
  });
};

// Deletes a story from the DB.
exports.destroy = function(req, res) {
  Story.findById(req.params.id, function (err, story) {
    if(err) { return handleError(res, err); }
    if(!story) { return res.send(404); }
    story.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}