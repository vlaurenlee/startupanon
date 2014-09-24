'use strict';

angular.module('eaApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.active_stories = [];

    $http.get('/api/stories?status=Active').success(function(stories) {
      $scope.active_stories = stories;
      socket.syncUpdates('story', $scope.active_stories);
    });

    $scope.submit_form = false; 

    $scope.addStory = function() {
      if($scope.newStory === '') {
        return;
      }
      $http.post('/api/stories', { body: $scope.newStory })
        .success(function(res){
          console.log('successfully completed');
          $scope.newStory.notification = "Thanks, your story is getting approved."
          $scope.submit_form = false;
          $scope.newStory = '';
        })
        .error(function(err){
          console.log('error in completion');
          $scope.newStory.notification = "There was an error, please try submitting again."
        });
    };

    $scope.flag = function(story) {
      $http.post('/api/stories/flag/' + story._id);
    };

    $scope.upvote = function(story) {
      $http.post('/api/stories/upvote/' + story._id);
    };

    $scope.downvote = function(story) {
      $http.post('/api/stories/downvote/' + story._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('story');
    });

    $scope.$on('$flag', function () {
      socket.unsyncUpdates('story');
    });
  });
