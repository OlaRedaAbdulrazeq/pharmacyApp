app.controller(
  "CartController",
  function ($scope, $location, CartService, PharmacyService) {
    $scope.cartItems = CartService.getItems();

    $scope.getTotal = function () {
      return CartService.getTotal();
    };

    $scope.removeItem = function (productId) {
      CartService.removeItem(productId);
      $scope.cartItems = CartService.getItems();
    };

    $scope.increaseQty = function (item) {
      CartService.updateQty(item.id, item.qty + 1);
    };

    $scope.decreaseQty = function (item) {
      if (item.qty > 1) {
        CartService.updateQty(item.id, item.qty - 1);
      } else {
        CartService.removeItem(item.id);
        $scope.cartItems = CartService.getItems();
      }
    };

    $scope.orderSuccess = false;
    $scope.orderError = null;

    $scope.placeOrder = function () {
      let user = JSON.parse(localStorage.getItem("currentUser"));
      let total = CartService.getTotal();
      let items = CartService.getItems();

      PharmacyService.createOrder(user.id, total)
        .then(function (res) {
          let orderId = res.data[0].id;
          for (let i = 0; i < items.length; i++) {
            PharmacyService.addPurchase(
              orderId,
              items[i].id,
              items[i].qty,
              items[i].price,
            );
            PharmacyService.updateStock(items[i].id, items[i].qty);
          }
          CartService.clear();
          $scope.orderSuccess = true;
          setTimeout(function () {
            $location.path("/home");
            $scope.$apply();
          }, 2000);
        })
        .catch(function () {
          $scope.orderError = "Order failed, please try again.";
        });
    };
  },
);
