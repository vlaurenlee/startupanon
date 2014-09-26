'use strict';

angular.module('eaApp')
  .controller('MainCtrl', function ($scope, $http, $state, socket) {
    $scope.activeStories = [];

    $http.get('/api/stories?status=Active').success(function(stories) {
      $scope.activeStories = stories;
      socket.syncUpdates('story', $scope.activeStories);
    });

    $scope.submitForm = false; 

    $scope.launchForm = function(){
      $scope.submitForm = !$scope.submitForm;
    };

    $scope.closeForm = function(){
      console.log('here we are');
      $scope.submitForm = false;
      $state.go('main');
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('story');
    });

    $scope.$on('$flag', function () {
      socket.unsyncUpdates('story');
    });
  });
