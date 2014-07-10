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
        //var theOne = Category.query({catid: category._id});
        $scope.category = new Category();
        $scope.category.$del({catid:category._id});
        $scope.categories.forEach(function(item,index){
          if(item._id == category._id){
            $scope.categories.splice(index, 1);
          }
        });
    };
  }]);

phonecatControllers.controller('CategoryEdit', ['$scope','Category',
  function($scope, Category) {
    $scope.category = new Category();
    var PROPERTY = {name:"",values:"",type:"text",_id: 1};
    $scope.category.type = "product";
    $scope.category.order = "0";
    $scope.category.property = [
      PROPERTY
    ];
    $scope.categories = Category.query();
    $scope.create = function(category){
      console.log(category);
      category.$save();
    };


    $scope.addProperty = function(){
      var nProperty = {name:"",values:"",type:"text",_id: $scope.category.property.length+1};
      $scope.category.property.push(nProperty);
      console.log($scope.category.property);
    }
  }]);
