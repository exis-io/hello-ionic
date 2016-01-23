angular.module('starter.controllers', [])

.controller('DashCtrl', ['$scope', '$riffle', function($scope, $riffle) {
    $scope.response = "";
    $scope.connected = false;
    
    // Setup the domain we want to send messages to
    $scope.hello = $riffle.subdomain("Container.hello");
    // Setup the domain we will connect with
    $scope.me = $riffle.subdomain("me");
    // Set our token from the Auth appliance from my.exis.io
    $scope.me.setToken("REPLACEME");
    
    // When the connection is established this function is fired!
    $scope.$on("$riffle.open", function() {
        console.log("Connected to the fabric!");
        $scope.connected = true;
    });
    
    // This allows the "me" domain to join the fabric with the token we provided above
    $scope.me.join();
    
    // When they press the button, this function is fired!
    $scope.echo = function(text) {
        if(!$scope.connected) {
            $scope.response = "No connection - please check your token and connection.";
        } else {
            if(text === undefined) {
                text = "Hello World!";
            }
            
            // This makes the actual call, using the "hello" domain to send to the "echo" endpoint
            // the result is returned as a promise, and any errors are handled the standard way.
            $scope.hello.call("echo", text).then($riffle.wait(function(s) {
                $scope.response = s;
            }, String),
            function(error) {
                console.log(error);
                $scope.response = "Unable to communicate with echo. Please check your token, permissions, and connection.";
            });
        }
    }
}]);

