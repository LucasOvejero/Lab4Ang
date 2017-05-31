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

  	$scope.confirmar = function () {
  		var myObj = {};
  		myObj.usuario = $scope.nombreUsuario;
  		myObj.password = $scope.passwordUsuario;
  		myObj.rol = $scope.rolSelect;
      myObj.estado = true;
  		$http.post('http://localhost:4444/api/user/insert',myObj).then(function (success)
  		{
        console.log(success.data);
				$scope.nombreUsuario="";
				$scope.passwordUsuario="";
				
  			/*if(respond.data.error){
          console.log("ERRORAZO" + respond.data.message);
        }
  			else {
          console.log("insertadisimo " + respond.message);
        }*/
  		});
  	}

  });
