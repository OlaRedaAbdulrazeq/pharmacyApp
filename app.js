var app = angular.module("pharmacyApp", ["ngRoute"]);

app.config(function ($routeProvider) {
  $routeProvider
    // .when('/product/:id',{
    //     templateUrl:'views/product.html',
    //     controller:'ProductController'
    // }).otherwise({
    //     redirectTo:'/product/101'
    // })
    .when("/login", {
      templateUrl: "views/login.html",
      controller: "LoginController",
    })
    .when("/signup", {
      templateUrl: "views/signup.html",
      controller: "SignupController",
    })
    .when("/home", {
      templateUrl: "views/home.html",
      controller: "HomeController",
    })
    .when("/products", {
      templateUrl: "views/products.html",
      controller: "ProductsController",
    })
    .when("/cart", {
      templateUrl: "views/cart.html",
      controller: "CartController",
    })

    .otherwise({ redirectTo: "/login" });
});
