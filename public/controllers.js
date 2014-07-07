'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('CategoryCtroller', ['$scope', 'Category',
  function($scope, Category) {
    $scope.categories = Category.query();
    $scope.orderProp = 'upid';

    $scope.SaveOne = function(category){
      category.$save();
      //alert(category);
    }
  }]);

phonecatControllers.controller('CategoryEdit', ['$http','$scope','Category',
  function($http, $scope, Category) {
    $scope.category = {
      type:"product",
      order:0,
      property:JSON.stringify({})
    };
    $scope.categories = Category.query();
    console.log($scope.categories);
    $scope.create = function(category){
        console.log(category);
        $http.post("/admin/category/add",category).success(function(data, status, headers, config){
            alert("success");
        }).error(function(data, status, headers, config){
            alert("error");
        })
    }
  }]);
