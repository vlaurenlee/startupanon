'use strict';

var express = require('express');
var auth = require('../../auth/auth.service.js');
var controller = require('./story.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.post('/flag/:id', auth.isAuthenticated(), controller.flag);
router.post('/upvote/:id', controller.upvote);
router.post('/downvote/:id', controller.downvote);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;