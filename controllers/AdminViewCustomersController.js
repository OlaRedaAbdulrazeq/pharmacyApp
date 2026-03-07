adminApp.controller('AdminViewCustomersController',function($scope,adminService){
    $scope.isLoading=true
    $scope.getCustomersWithOrders = function(data) {
        return data.filter(customer => customer.role === 'user' && customer.orders && customer.orders.length > 0);
    };
    adminService.getAllCustomersPurchases()
    .then(function(response){
        $scope.showAllCustomers=$scope.getCustomersWithOrders(response.data)
        console.log($scope.showAllCustomers)
    })
    .catch(e=>console.error(e))
    .finally(()=>$scope.isLoading=false)


})