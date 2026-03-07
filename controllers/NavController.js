app.controller("NavController", function ($scope, $location, CartService) {
  $scope.currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
  $scope.getCartCount = function () {
    return CartService.getCount();
  };
  $scope.isLoginPage = function () {
    return $location.path() === "/login";
  };
  $scope.logout = function () {
    localStorage.removeItem("currentUser");
    $scope.currentUser = {};
    CartService.clear();
  };
});
