/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Story = require('../api/story/story.model');
var User = require('../api/user/user.model');

Story.find({}).remove(function() {
  Story.create({
    score: 25,
    body: "It's been 19 months and I have yet to ship anything. Paralyzed fear of putting myself and my company out there.",
    status: "Active"
  }, {
    score: 25,
    body: "My cofounder and I just went into an investor meeting and just bombed. They said there was no way we could ever succeed in any universe.",
    status: "Active"
  }, {
    score: 30,
    body: "My cofounder and I are fighting.",
    status: "Active"
  },  {
    score: 2,
    body: "It's been 19 months and I have yet to ship anything. Paralyzed fear of putting myself and my company out there.",
    status: "Active"
  },  {
    score: 46,
    body: "Blah Blah Blah I'm inappropriate",
    status: "Active"
  },{
    score: 33,
    body: "No names here.",
    status: "Active"
  });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});