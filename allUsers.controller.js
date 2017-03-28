(function () {
    var myApp = angular.module("myApp");
    myApp.controller("allUsersController", function (HomeService) {

        this.allUsersList = "";

        this.eachUser = "";

        var self = this;
        HomeService.getAllUsers().then(function (data) {
            localStorage.setItem("allUsers", JSON.stringify(data));
            self.allUsersList = data;

        });

        this.allUsersCtrl = function(index){
        this.eachUser = this.allUsersList[index];        
    }
    });

    
})();