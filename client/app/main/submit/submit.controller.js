angular.module('eaApp')
  .controller('SubmitCtrl', function ($scope, $http, $state, socket) {

    $scope.newStory = '';

    $scope.addStory = function() {
      console.log('in parent add story');
      if($scope.newStory === '') {
        return;
      }
      $http.post('/api/stories', { body: $scope.newStory })
        .success(function(res){
          $scope.newStory = '';
          $state.go('main.thankyou');
        })
        .error(function(err){
          console.log('error in completion');
          $scope.newStory.notification = "There was an error, please try submitting again."
        });
    };
  });
