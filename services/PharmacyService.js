const API_URL = "https://qiwuggzywsrdvyeaoxcn.supabase.co/rest/v1/customers";
const PRODUCTS_URL =
  "https://qiwuggzywsrdvyeaoxcn.supabase.co/rest/v1/products";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpd3VnZ3p5d3NyZHZ5ZWFveGNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1ODE0NTcsImV4cCI6MjA4ODE1NzQ1N30.S8Kg-UZJSgqOY2B-0940M_ZZ3gvUYg0SxVxZwejfoMo";
const ORDERS_URL = "https://qiwuggzywsrdvyeaoxcn.supabase.co/rest/v1/orders";
const PURCHASES_URL =
  "https://qiwuggzywsrdvyeaoxcn.supabase.co/rest/v1/purchases";
const config = {
  headers: {
    apikey: API_KEY,
    Authorization: "Bearer " + API_KEY,
    "Content-Type": "application/json",
    Prefer: "return=representation",
  },
};
app.service("PharmacyService", function ($http) {
  this.login = function (email, password) {
    return $http.get(
      API_URL + "?email=eq." + email + "&password=eq." + password,
      config,
    );
  };
  this.checkEmail=function(email){
    return $http.get(API_URL + "?email=eq." + email,config);
  }
  this.registerUser=function(user){
    return $http.post(API_URL,user,config)
  }
  this.getProducts = function () {
    return $http.get(
      PRODUCTS_URL + "?select=id,category,description,price,imgUrl&limit=12",
      config,
    );
  };
  this.getLovedProducts = function () {
    return $http.get(
      PRODUCTS_URL +
        "?select=id,category,description,price,imgUrl&limit=9&offset=12",
      config,
    );
  };
  this.getAllProducts = function () {
    return $http.get(
      PRODUCTS_URL + "?select=id,category,description,price,imgUrl",
      config,
    );
  };
  this.createOrder = function (customerId, total) {
    return $http.post(
      ORDERS_URL,
      {
        customer_id: customerId,
        total: total,
        date: new Date(),
        status: "pending",
      },
      config,
    );
  };
  this.addPurchase = function (orderId, productId, quantity, price) {
    return $http.post(
      PURCHASES_URL,
      {
        order_id: orderId,
        product_id: productId,
        quantity: quantity,
        price: price,
      },
      config,
    );
  };
  this.updateStock = function (productId, orderedQty) {
    return $http.patch(
      PRODUCTS_URL + "?id=eq." + productId,
      {
        quantity: orderedQty,
      },
      config,
    );
  };
});
