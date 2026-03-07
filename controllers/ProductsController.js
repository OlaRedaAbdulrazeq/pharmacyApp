app.controller(
  "ProductsController",
  function ($scope, $routeOarams, PharmacyService, CartService) {
    $scope.allProducts = [];
    $scope.filteredProducts = [];
    $scope.selectedCategory = "All";
    $scope.sortOrder = "";
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

    PharmacyService.getAllProducts().then(function (res) {
      $scope.allProducts = res.data;
      $scope.filteredProducts = res.data;
    });

    $scope.setCategory = function (category) {
      $scope.selectedCategory = category;
      if (category === "All") {
        $scope.filteredProducts = $scope.allProducts;
      } else {
        $scope.filteredProducts = [];
        for (var i = 0; i < $scope.allProducts.length; i++) {
          if ($scope.allProducts[i].category === category) {
            $scope.filteredProducts.push($scope.allProducts[i]);
          }
        }
      }
    };
  },
);
