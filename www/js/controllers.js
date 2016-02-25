angular.module('starter.controllers', [])

.controller('DashCtrl', ['$scope', '$riffle', function($scope, $riffle) {
    $scope.response = "";
    $scope.connected = false;
    
    // Setup the domain we want to send messages to
    $scope.hello = $riffle.subdomain("Container.hello");
    // Login Anonymously via the Auth appliance using Auth Level 0
    $riffle.login();
    
    // When the connection is established this function is fired!
    $scope.$on("$riffle.open", function() {
        console.log("Connected to the fabric!");
    });
    
    // When they press the button, this function is fired!
    $scope.echo = function(text) {
        if(!$riffle.connected) {
            $scope.response = "No connection - please check your token and connection.";
        } else {
            if(text === undefined) {
                text = "Hello World!";
            }
            
            // This makes the actual call, using the "hello" domain to send to the "echo" endpoint
            // the result is returned as a promise, and any errors are handled the standard way.
            $scope.hello.call("echo", text).want(String).then(function(s) {
                $scope.response = s;
            },
            function(error) {
                console.log(error);
                $scope.response = "Unable to communicate with echo. Please check your token, permissions, and connection.";
            });
        }
    }
}]);

