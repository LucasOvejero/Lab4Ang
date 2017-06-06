'use strict';

/**
 * @ngdoc function
 * @name anlApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the anlApp
 */

var app=angular.module('anlApp');

app.controller('ListCtrl',function($scope,$http,$rootScope,$location){


	$http.get('http://localhost:4444/api/user/list')

  	.then(
  	function(ret){
      console.log(ret.data);
  		$scope.user=ret.data;
  		$scope.cargando=false;
  	}
  	,function(e){console.log(e);});
});
