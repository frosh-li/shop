'use strict';

/* Services */

var phonecatServices = angular.module('phonecatServices', ['ngResource']);

phonecatServices.factory('Category', ['$resource',
  function($resource){
    return $resource('/admin/category/:catid', {catid:'@catid'}, {
      query: {method:'GET', params:{}, isArray:true},
      save: {method:'POST', isArray:false},
      update:{method:"PUT", isArray:false},
      del:{method:"DELETE", isArray:false}
    });
  }]);

