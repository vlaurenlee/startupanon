'use strict';

angular.module('eaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('main.submit', {
        url: 'submit',
        templateUrl: 'app/main/submit/submit.html',
        controller: 'SubmitCtrl'
      })
      .state('main.thankyou', {
        url: 'thankyou',
        templateUrl: 'app/main/submit/thankyou.html'
      })
      .state('main.why', {
        url: 'why',
        templateUrl: 'app/main/why/why.html'
      });
  });