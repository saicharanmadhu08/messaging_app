var myApp = angular.module("myApp", ['ngRoute']);

myApp.controller("mainController", function ($rootScope) {
      (function (){

        if (sessionStorage.getItem("sessionUser") === null) {
            $rootScope.status = true;
        } else{
            $rootScope.status = false;
        }

    })();

});