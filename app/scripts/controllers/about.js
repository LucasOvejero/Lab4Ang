'use strict';

/**
 * @ngdoc function
 * @name anlApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the anlApp
 */
var app=angular.module('anlApp');
app.controller('AboutCtrl', function ($scope,$http) {
  	$http.get('http://localhost:4444/personas/list').
  	then(function(ret){
  		$scope.personas=ret.data;
  		
  	},function(e){console.log(e);});
    
  });
