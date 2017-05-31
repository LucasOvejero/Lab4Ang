'use strict';

/**
 * @ngdoc function
 * @name anlApp.controller:rolCtrl
 * @description
 * # rolCtrl
 * Controller of the anlApp
 */
var app=angular.module('anlApp');


app.controller('rolCtrl', function ($scope,$http) {


	$http.get('http://localhost:4444/api/*/list')
  		.then(function(ret){
  		//ret debe ser un array , que contenga getCollectionNames();
  		console.log(ret.data);
  		var myArray =[];
  		for(var a in ret.data){
  			myArray.push({collection:ret.data[a].name,insert:false,list:false,find:false,update:false,delete:false});
  		}
  		$scope.colecciones = myArray;
  		//{rol:'nombre',activo:true,collections:myArray}
  	},function(e){console.log(e);});


  	$scope.nombrerol = "Nombre";

  	$scope.confirmar = function () {
  		var myObj = {};
  		myObj.rol = $scope.nombrerol;
  		myObj.activo = true;
  		myObj.collections = $scope.colecciones;
  		$http.post('http://localhost:4444/api/rol/insert',myObj).then(function (respond)
  		{
  			if(respond.data.error){ console.log("ERRORAZO" + respond.data.data.message);}
  			else { console.log("insertadisimo " + respond.message);}
  		});

  	}

  });
