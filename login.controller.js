(function () {
    var myApp = angular.module("myApp");
    myApp.controller("LoginController", login);
    function login(GetCredentialsService,$rootScope,$location) {
        this.username = "";

        this.password = "";

        this.errorOccured = false;


        this.usernameManipulation = function () {
            var usernameLength = (this.username).length;
            if (usernameLength <= 0) {
                this.usernameErrorOccured = true;
                this.usernameErrorMessage = "Please enter username"
            } else {
                this.usernameErrorOccured = false;
            }
        }

        this.passwordManipulation = function () {
            var passwordLength = (this.password).length;
            if (passwordLength <= 0) {
                this.passwordErrorOccured = true;
                this.passwordErrorMessage = "Please enter  password"
            } else {
                this.passwordErrorOccured = false;
            }
        }

        this.onSubmit = function () {
            var username = this.username;
            var password = this.password;
            if (username === "" || password === "") {
                this.errorOccured = true;
                this.errorMessage = "Please enter valid Credentials"
            } else {
                this.errorOccured = false;

                var self = this;
                GetCredentialsService.getCredentials()
                    .then(function (data) {

                        for (var i = 0; i < data.length; i++) {
                            if (username === data[i].username && password === data[i].password) {
                                self.errorOccured = false;
                                $rootScope.status = false;
                                sessionStorage.setItem("sessionUser", username);
                                //$location.path("/home/"+username);
                                   
                                break;
                            } else {
                                self.errorOccured = true;
                                self.errorMessage = "Please enter valid Credentials"
                            }
                        }


                    });
            }
        }






    }
})();