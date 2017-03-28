(function () {
    var myApp = angular.module("myApp");
    myApp.controller("navBarController", function ($rootScope, $location, HomeService) {

        this.username = "";

        this.close = true;

        this.remove = function () {
            this.close = false;
        };

        this.presentUser = sessionStorage.getItem("sessionUser");

        this.logout = function () {
            sessionStorage.removeItem("sessionUser");
            sessionStorage.removeItem("presentUserName");
            $rootScope.status = true;
            $location.path("/");
        }


        var self = this;
        HomeService.getAllUsers().then(function (data) {
            for (var i = 0; i < data.length; i++) {
                for (key in data[i]) {
                    if (data[i][key] === self.presentUser) {
                        self.username = data[i].name;
                    }

                }
            }
            sessionStorage.setItem("presentUserName", self.username);
        });


    });
})();