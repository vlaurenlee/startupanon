'use strict';

angular.module('eaApp')
  .controller('DashboardCtrl', function ($scope, $http, socket) {

    $http.get('/api/stories?status=Flagged').success(function(stories) {
      $scope.flaggedStories = stories;
      socket.syncUpdates('story', $scope.flaggedStories);
    });

    $http.get('/api/stories?status=Submitted').success(function(stories) {
      $scope.submittedStories = stories;
      socket.syncUpdates('story', $scope.submittedStories);
    });

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('story');
    });

    $scope.unflag = function(story) {
      story.status = 'Active';
      $http.put('/api/stories/'+story._id, story);
    };

    $scope.publish = function(story) {
      story.status = 'Active';
      $http.put('/api/stories/'+story._id, story);
    };

    $scope.delete = function(story) {
      $http.post('/api/stories/flag/' + story._id);
    };
  });
