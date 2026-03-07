app.controller('SignupController', function($scope, PharmacyService, $location){

    $scope.emailExists = false;

    $scope.checkEmail = function(){
        PharmacyService.checkEmail($scope.email)
        .then(function(response){
            $scope.emailExists = response.data.length > 0;
        })
        .catch((e)=>console.error(e));
    };

    $scope.signup = function(){

        if($scope.emailExists) return;

        const user = {
            name: $scope.name,
            email: $scope.email,
            password: $scope.password
        };

        PharmacyService.registerUser(user)
        .then(function(){
            $location.path('/login');
        });
    };
});