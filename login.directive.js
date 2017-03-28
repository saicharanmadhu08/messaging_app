(function () {
    var myApp = angular.module("myApp");
    myApp.directive("loginPage", function () {
        return {
            templateUrl: "login.html"
        };
    });

})();