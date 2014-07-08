'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('CategoryCtroller', ['$http','$scope', 'Category',
  function($http,$scope, Category) {
    $scope.categories = Category.query();
    $scope.orderProp = 'upid';

    $scope.SaveOne = function(category){
      console.log(category);
      category.$update({catid: category._id});
    };
    $scope.Delete = function(category){
        var theOne = Category.query({catid: category._id});
        theOne.$del({catid:category._id});
        $scope.categories.data.forEach(function(item,index){
          if(item._id == category._id){
            $scope.categories.data.splice(index, 1);
          }
        });
    }
  }]);

phonecatControllers.controller('CategoryEdit', ['$scope','Category',
  function($scope, Category) {
    $scope.category = new Category();
    $scope.category.type = "product";
    $scope.category.order = "0";
    $scope.category.property = JSON.stringify({});
    $scope.categories = Category.query();
    $scope.create = function(category){
      console.log(category);
      category.$save();
    }
  }]);
