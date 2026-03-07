app.controller(
  "LoginController",
  function ($scope, $location, PharmacyService) {
    $scope.email = "";
    $scope.password = "";
    $scope.emailError = null;
    $scope.passwordError = null;

    $scope.login = function () {
      $scope.emailError = null;
      $scope.passwordError = null;
      if (!$scope.email) {
        $scope.emailError = "Email is required";
      }
      if (!$scope.password) {
        $scope.passwordError = "Password is required";
      } else if ($scope.password.length <= 3) {
        $scope.passwordError = "Password must be at least 4 Charecters long";
      }
      if ($scope.emailError || $scope.passwordError) return;

      PharmacyService.login($scope.email, $scope.password)
        .then(function (res) {
          if (res.data.length === 0) {
            $scope.emailError = "invalid email or password";
            return;
          }
          let user = res.data[0];
          localStorage.setItem("currentUser", JSON.stringify(user));
          if (user.role === "admin") {
            // $location.path("adminPanel");
            window.location.replace("adminPanel.html");
          } else {
            $location.path("/home");
          }
        })
        .catch(function () {
          $scope.emailError = "login failed, please try again";
        });
    };
  },
);
