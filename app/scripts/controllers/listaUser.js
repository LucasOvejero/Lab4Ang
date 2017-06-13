'use strict';

/**
 * @ngdoc function
 * @name anlApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the anlApp
 */

var app=angular.module('anlApp');

app.controller('ListUserCtrl',function($scope,$http,$rootScope,$location){

	$http.get('http://localhost:4444/api/rol/list')

  	.then(
  	function(ret){
      console.log(ret.data);
  		$scope.roles=ret.data;
  		$scope.cargando=false;
  	}
  	,function(e){console.log(e);});


	$http.get('http://localhost:4444/api/user/list')

  	.then(
  	function(ret){

  		$scope.user=ret.data;
  		$scope.cargando=false;
  	}
  	,function(e){console.log(e);});

		$scope.confirmaUser = function(ret) {
			console.log(ret);
			$scope.userselected=ret;



		}

		$scope.actualizar_user = function(obj, id){

			console.log(obj);	console.log(id);
  		$http.post('http://localhost:4444/api/user/update?id=' + id , obj)
			.then(function (respond)
  		{
				//scope.rol = respond.data;
				console.log(respond);

  		}, function(error){
				console-log(error);
			}
		)
		}
});
