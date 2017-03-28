(function () {
    var myApp = angular.module("myApp");
    myApp.controller("messageController", function (HomeService, $interval) {


        this.toArray = [];

        this.inboxArray = [];

        this.outboxArray = [];

        var self = this;



        HomeService.getAllUsers(HomeService).then(function (data) {
            self.allUsersList = data;

        });

        this.sendTo = function (val) {
            this.to = val;
        };

        this.toShower = function () {
            var to = this.to;
            if (to.length > 0) {
                this.findTo = true;
                this.toArray = [];
                for (var i = 0; i < this.allUsersList.length; i++) {

                    var name = this.allUsersList[i].name;

                    if (name.toLowerCase().indexOf(to) >= 0) {
                        this.toArray.push(name);
                    }

                }

            } else {
                this.findTo = false;
            }

        };


        this.composeNewMsg = function () {
            this.successSent = false;
            this.failSent = false;
            this.enableNewMessage = true;
            this.enableInbox = false;
            this.enableOutbox = false;
        };

        this.showOutbox = function () {
            this.enableNewMessage = false;
            this.enableInbox = false;
            this.outboxArray = [];

            HomeService.getAllMessages().then(function (data) {
                for (var i = 0; i < data.length; i++) {
                    var presentUser = sessionStorage.getItem("sessionUser");
                    if (presentUser == data[i].from) {
                        console.log(data[i]);
                        self.outboxArray.push(data[i]);
                    }
                }
            });


            this.enableOutbox = true;

        };



        this.showInbox = function () {
            this.enableNewMessage = false;
            this.enableOutbox = false;
            this.inboxArray = [];

            HomeService.getAllMessages().then(function (data) {
                var presentUser = sessionStorage.getItem("sessionUser");
                var presentUserName = "";
                HomeService.getAllUsers().then(function (data) {
                    for (var i = 0; i < data.length; i++) {
                        for (key in data[i]) {
                            if (data[i][key] === presentUser) {
                                presentUserName = data[i].name;
                            }

                        }
                    }
                    sessionStorage.setItem("presentUserName", presentUserName);
                });

                for (var i = data.length - 1; i > 0; i--) {
                    var presentUserName = sessionStorage.getItem("presentUserName");
                    if (presentUserName == data[i].to) {
                        self.inboxArray.push(data[i]);
                    }
                }
            });

            this.enableInbox = true;


        };



        this.sendMessage = function () {
            var from = sessionStorage.getItem("sessionUser");
            var to = this.to;
            var subject = this.subject;
            var message = this.messageText;

            var id = new Date().toTimeString();
            var messageJson = { "id": id, "from": from, "to": to, "subject": subject, "message": message };

            HomeService.saveMessage(messageJson).then(function () {
                self.successSent = true;
                self.successMessage = "Message Sent SuccessFully!!";
            }, function () {
                self.failSent = true;
                self.failMessage = "Message Sent Failed, Please try again!!";
            });

            self.to = "";
            self.subject = "";
            self.messageText = "";

        };

        this.changePriority = function (eachMsg) {
            var tempObj = {
                "id": eachMsg.id,
                "from": eachMsg.from,
                "to": eachMsg.to,
                "subject": eachMsg.subject,
                "message": eachMsg.message,
                "important": !eachMsg.important
            };

            HomeService.changePriority(tempObj, eachMsg.id).then(function () {
                    self.showInbox();
            });

        };

        this.deleteMsg = function (eachMsg) {
            var id = eachMsg.id;

            HomeService.deleteMsg(id).then(function(){
                 self.showInbox();
            });
        };
    });







    myApp.directive("newMessage", function () {
        return {
            templateUrl: "newMessage.html"
        };
    });

    myApp.directive("inbox", function () {
        return {
            templateUrl: "inbox.html"
        };
    });

    myApp.directive("outbox", function () {
        return {
            templateUrl: "outbox.html"
        };
    });
})();