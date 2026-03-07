adminApp.controller('AdminDashboardController',function($scope,$timeout,adminService,adminSharedService){
    $scope.totalOrdersPrice = 0;
    $scope.countCustomers=function(users){
        return users.filter(function(user){return user.role === 'user'}).length;
    }
   
    $scope.countOutOfStock=function(items){
        return items.filter((itm)=> itm.quantity === 0).length;
    }

    adminService.getCustomers()
    .then(function(response){
        $scope.customers=response.data;
        console.log($scope.customers)
        $scope.totalCustomers= $scope.countCustomers($scope.customers);
    })
    .catch(function(e){console.error(e)});

    adminService.getOrders()
    .then(function(response){
        $scope.orders=response.data;
        console.log($scope.orders)
        $scope.totalOrdersPrice= $scope.orders.filter(order => !order.returned).reduce((acc,current)=>{
                acc+=current.total
                return acc;
            },0)
        console.log("Initial total sales:", $scope.totalOrdersPrice);
        let returnedOrder = adminSharedService.getReturned();
        if (returnedOrder) {
            $scope.totalOrdersPrice -= returnedOrder.total;
            adminSharedService.clearReturned();
            console.log('new sales after return',$scope.totalOrdersPrice)
        }
    })
    .catch(e=>console.error(e));

    adminService.getItems()
    .then(function(response){
        $scope.Items=response.data;
        $scope.totalOutOfStock=$scope.countOutOfStock($scope.Items)
    })
    .catch(e=>console.error(e));

})