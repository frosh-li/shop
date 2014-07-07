'use strict';

/* App Module */

var shopApp = angular.module('shopApp', [
  'ngRoute',
  'phonecatControllers',
  'phonecatFilters',
  'phonecatServices'
]);

shopApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/category', {
        templateUrl: '/views/admin/category/list.html',
        controller: 'CategoryCtroller'
      }).
      
      otherwise({
        redirectTo: '/category'
      });
  }]);
