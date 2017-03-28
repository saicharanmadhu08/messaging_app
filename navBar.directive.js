(function () {
    var myApp = angular.module("myApp");
    myApp.directive("navigationBar", function () {
        return {
            templateUrl: 'navbar.html'
        };
    });
})();