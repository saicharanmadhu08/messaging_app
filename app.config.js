(function () {
    var myApp = angular.module("myApp");
    myApp.config(function ($routeProvider) {
        var presentUser = sessionStorage.getItem("sessionUser");

        $routeProvider.when('/home/:presentUser', {
            templateUrl: 'home.html',
            controller : 'navBarController'
        }).when('/messages', {
                templateUrl: 'messages.html'
            }).when('/allUsers', {
                templateUrl: 'allUsers.html',
            }).when('/logout', {
                template: 'logout',
            });
    });
})();