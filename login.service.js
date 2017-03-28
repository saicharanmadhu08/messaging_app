(function () {
    var myApp = angular.module("myApp");
    myApp.service("GetCredentialsService", getCredentialsService);
    function getCredentialsService($http) {
        var self = this;

        self.getCredentials = function () {
            var promise1 = $http.get("http://localhost:3000/credentials/");
            var promise2 = promise1.then(function (response) {
                return response.data;
            });

            return promise2;
        }    

    }
})();