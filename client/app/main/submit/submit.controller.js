'use strict';

angular.module('eaApp')
  .controller('SubmitCtrl', function ($scope, $http, $state) {

    $scope.newStory = '';

    $scope.addStory = function() {
      console.log('in parent add story');
      if($scope.newStory === '') {
        return;
      }
      $http.post('/api/stories', { body: $scope.newStory })
        .success(function(){
          $scope.newStory = '';
          $state.go('main.thankyou');
        })
        .error(function(){
          console.log('error in completion');
          $scope.newStory.notification = 'There was an error, please try submitting again.';
        });
    };
  });
