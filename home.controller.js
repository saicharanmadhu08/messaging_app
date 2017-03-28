(function () {
    var myApp = angular.module("myApp");
    myApp.controller("homeController", function (HomeService) {

        this.presentUserDetails = "";
        this.presentUser = sessionStorage.getItem("sessionUser");

        var self = this;
        HomeService.getAllUsers().then(function (data) {
            localStorage.setItem("allUsers", JSON.stringify(data));
            var presentUser = self.presentUser;
            for (var i = 0; i < data.length; i++) {

                for (key in data[i]) {
                    if (data[i][key] === presentUser) {
                        self.presentUserDetails = data[i];
                    }
                }
            }

        });
    });
})();