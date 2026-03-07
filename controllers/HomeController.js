app.controller(
  "HomeController",
  function ($scope, PharmacyService, CartService) {
    $scope.products = [];
    PharmacyService.getProducts().then(function (res) {
      $scope.products = res.data;
    });

    PharmacyService.getLovedProducts().then(function (res) {
      $scope.lovedProducts = res.data;
    });
    $scope.addToCart = function (product) {
      CartService.addItem(product);
    };
    $scope.increase = function (product) {
      CartService.addItem(product);
    };

    $scope.decrease = function (product) {
      var items = CartService.getItems();
      for (var i = 0; i < items.length; i++) {
        if (items[i].id === product.id) {
          if (items[i].qty === 1) {
            CartService.removeItem(product.id);
          } else {
            CartService.updateQty(product.id, items[i].qty - 1);
          }
          break;
        }
      }
    };

    $scope.getQty = function (productId) {
      var items = CartService.getItems();
      for (var i = 0; i < items.length; i++) {
        if (items[i].id === productId) {
          return items[i].qty;
        }
      }
      return 0;
    };
  },
);
