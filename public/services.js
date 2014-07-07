'use strict';

/* Services */

var phonecatServices = angular.module('phonecatServices', ['ngResource']);

phonecatServices.factory('Category', ['$resource',
  function($resource){
    return $resource('/admin/category/list/:catid', {}, {
      query: {method:'GET', params:{catid:'0'}, isArray:false},
      save: {method:'POST', isArray:false}
    });
  }]);

phonecatServices.factory('CategoryEdit', ['$resource',
  function($resource){
    return $resource('/admin/category/add', {}, {
      //query: {method:'GET', params:{catid:'0'}, isArray:false},
      save: {method:'POST', isArray:false}
    });
  }]);
