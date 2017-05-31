'use strict';

/**
 * @ngdoc overview
 * @name anlApp
 * @description
 * # anlApp
 *
 * Main module of the application.
 */
var app=angular
  .module('anlApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngStorage'
  ]);
app.constant('ApiEntryPoint',{url: 'http://localhost:4444'});
 app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/login',{
        templateUrl:'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/list', {
        templateUrl: 'views/list.html',
        controller: 'ListCtrl',
        controllerAs: 'list'
      })
      .when('/nuevousuario', {
        templateUrl: 'views/nuevousuario.html',
        controller: 'UserCtrl',
        controllerAs: 'usuario'
      })
      .when('/nuevorol',{
        templateUrl: 'views/nuevorol.html',
        controller: 'rolCtrl',
        controllerAs: 'rol'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
app.factory('authInterceptor',function($q,$rootScope,$window,$location,$localStorage){
  return{
    request: function(conf){

      if (/^views/.test(conf.url)) {
        return conf;
      }

      conf.headers=conf.headers||{};
      if('user' in $localStorage){

        $window.sessionStorage['authtoken']=$localStorage.user.token;
        $rootScope.user=$localStorage.user.data;
        $rootScope.isAuthenticated=true;
      }
      if($window.sessionStorage.length>0){
        conf.headers["Authorization"]='Bearer '+$window.sessionStorage["authtoken"];
      }
      return conf;
    },
    responseError:function(responseError){
      if(responseError.status===401){
        $location.path('/login');
      }
      return $q.reject(responseError);
    }
  };
});

app.factory('AuthSrv', function($rootScope, $q, $window, $http, $localStorage, ApiEntryPoint) {
  $rootScope.isAuthenticated = false;
  return {
    getUser: function() {
      return $rootScope.user;
    },
    islogged: function() {
      return ($rootScope.isAuthenticated);
    },
    login: function(credentials) {
      $rootScope.isAuthenticated = false;
      return $q(function(resolve, reject){
        $http
        .post(ApiEntryPoint.url+'/login', {credentials: credentials})
        .then(function(res){
          $rootScope.isAuthenticated = true;
          var usuario=res.data.data;
          //console.log(res);
          $window.sessionStorage["authtoken"] = usuario.token;
          $window.sessionStorage["id"] = usuario.id;
          $localStorage.user= usuario;
          $rootScope.user = usuario;
          resolve(res.data);
        }, function (err) {
          reject(err);
        });
      });
    },
    logout: function() {
      delete $rootScope.user;
      $rootScope.isAuthenticated = false;
      delete $window.sessionStorage["authtoken"];
      delete $window.sessionStorage["id"];
    }
  };
});

app.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});
