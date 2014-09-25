'use strict';

angular.module('eaApp')
  .controller('MainCtrl', function ($scope, $http, $state, socket) {
    $scope.active_stories = [];

    $http.get('/api/stories?status=Active').success(function(stories) {
      $scope.active_stories = stories;
      socket.syncUpdates('story', $scope.active_stories);
    });

    $scope.submit_form = false; 

    $scope.launch_form = function(){
      $scope.submit_form = !$scope.submit_form;
    }

    $scope.close_form = function(){
      $scope.submit_form = false;
      $state.go('main');
    }

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('story');
    });

    $scope.$on('$flag', function () {
      socket.unsyncUpdates('story');
    });
  });
