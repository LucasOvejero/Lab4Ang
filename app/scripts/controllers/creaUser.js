'use strict';

/**
 * @ngdoc function
 * @name anlApp.controller:rolCtrl
 * @description
 * # rolCtrl
 * Controller of the anlApp
 */
var app=angular.module('anlApp');


app.controller('UserCtrl', function ($scope,$http,$rootScope) {


	$http.get('http://localhost:4444/api/rol/list')
  		.then(function(ret){
      var myArray =[];
  		for(var a in ret.data){
        console.log(ret.data[a].rol);
  			myArray.push(ret.data[a]);
  		}
      $scope.rolUsuario=myArray;

  	},function(e){console.log(e);});


		$scope.enviar = function (formData) {
			var myObj = {};
	 	 myObj.usuario = formData.nombreUsuario;
	 	 myObj.password = formData.passwordUsuario;
	 	 myObj.rol = formData.rolSelect;
	 	 myObj.estado = true;
	 	 $http.post('http://localhost:4444/api/user/insert',myObj).then(function (success)
	 	 {
	 		 console.log(success.data);
	 		 $scope.nombreUsuario="";
	 		 $scope.passwordUsuario="";
	 		 });
 };


  });
