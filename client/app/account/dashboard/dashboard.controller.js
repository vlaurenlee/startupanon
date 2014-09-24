'use strict';

angular.module('eaApp')
  .controller('DashboardCtrl', function ($scope, $http, socket, Auth) {

    $http.get('/api/stories?status=Flagged').success(function(stories) {
      $scope.flagged_stories = stories;
      socket.syncUpdates('story', $scope.flagged_stories);
    });

    $http.get('/api/stories?status=Submitted').success(function(stories) {
      $scope.submitted_stories = stories;
      socket.syncUpdates('story', $scope.submitted_stories);
    });

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('story');
    });

    $scope.unflag = function(story) {
      story.status = "Active";
      $http.put('/api/stories/'+story._id, story);
    };

    $scope.publish = function(story) {
      story.status = "Active";
      $http.put('/api/stories/'+story._id, story);
    };

    $scope.delete = function(story) {
      $http.post('/api/stories/flag/' + story._id);
    };
  });
