'use strict';

/**
 * @ngdoc function
 * @name anlApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the anlApp
 */

var app=angular.module('anlApp');
app.controller('MainCtrl', function ($scope,$http){
 	$scope.nombre='lucas';
 	$scope.nuevo="";
 	$scope.edad=0;
 	$scope.pets=["perro","gato","tortuga","pipio"];

 	$scope.agregar= function(pet){
 		$scope.pets.push(pet);
 	}

 	$scope.borrar=function(pet){

 	}
  });
app.controller('LoginCtrl', function ($scope, $rootScope, $location, AuthSrv) {
  $scope.wrong = false;
  $rootScope.isAuthenticated = false;
  $scope.credentials = {};
  $scope.message = '';
  if ($rootScope.isAuthenticated) {
    $location.path('/list');
    $rootScope.isAuthenticated = true;
    return;
  }

  $scope.doLogin = function(credentials){
    $rootScope.isLoading = true;
    AuthSrv.login(credentials)
      .then(function(response){

        $rootScope.isLoading = false;
        $rootScope.isAuthenticated = true;
      }, function (err) {
        $rootScope.isLoading = false;
        $scope.wrong = true;
        $scope.message = "E-mail y/o contraseña incorrecta";
      });
  };
});
/*app.controller('LoginCtrl',function($scope,$http,$rootScope){
	$scope.credentials={usuario:"",password:""};
	$scope.tok={mensaje:"nada"};
	$scope.doLogin= function(cred){

		$http.post('http://localhost:4444/login',{credentials:cred}).then(function(respon){
			$rootScope.token=respon.data.data.token;
			console.log(respon.data.data.token);
		},function(e){
			console.log(e);
		});
	}
});*/

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


app.controller('InsertCtrl',function($scope,$http,$rootScope){
	$scope.datos={nombre:"",apellido:"",numero:0};
	$scope.ingresando=true;
	$scope.send=function(data){
		$http.post('http://localhost:4444/api/personas/insert',data).then
		(function(success){
				console.log(success.data);
				$scope.mesagge=success.data.message
				$scope.ingresando=false;
			});
	}
});
 /*
angular.module('anlApp')
  .controller('MainCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });*/
