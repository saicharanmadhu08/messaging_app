(function () {
    var myApp = angular.module("myApp");
    myApp.service("HomeService", homeService);
    function homeService($http) {
        var self = this;

        self.getAllUsers = function () {
            var promise1 = $http.get("http://localhost:3000/users");
            var promise2 = promise1.then(function (response) {
                return response.data;
            });

            return promise2;
        };

        self.saveMessage = function(message){

            return $http.post("http://localhost:3000/messages",message)
                .then(function(response){
                    console.log(response);
                });
        }; 

        self.changePriority = function(status,id){
            return $http.put("http://localhost:3000/messages/"+id, status).then(function(response){
                    console.log(response);
            });
        };

         self.getAllMessages = function () {
            var promise1 = $http.get(" http://localhost:3000/messages");
            var promise2 = promise1.then(function (response) {
                return response.data;
            });

            return promise2;
        };

         self.getMessage = function (id) {
            var promise1 = $http.get(" http://localhost:3000/messages/"+id);
            var promise2 = promise1.then(function (response) {
                return response.data;
            });

            return promise2;
        };

        self.deleteMsg = function(id){
            return $http.delete("http://localhost:3000/messages/"+id)
                .then(function(response){
                    console.log(response);
                });
        };
   

    }
})();