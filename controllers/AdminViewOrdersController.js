adminApp.controller("AdminViewOrdersController",function($scope,$timeout,adminService,adminSharedService){
    $scope.showUpdateAlert=false;
    $scope.alert=''
    $scope.showErrorAlert=false;
    $scope.isLoading=true
    adminService.getOrders()
    .then(function(response){
        console.log(response.data)
        $scope.orders=response.data;
    //    looping over the array storing the response to add a new property that holds the original status of the order:
    $scope.orders.forEach(order => {
            order.originalState = order.status;
    });
    })
    .catch(e=>console.error(e))
    .finally(()=>$scope.isLoading=false)

    $scope.modifyStatus=function(order){
        let updatedOrder={
            status: order.status
        }
        if(order.status === 'returned'){
            updatedOrder.returned=true
        }
        adminService.modifyOrderStatus(order.id,updatedOrder)
       .then(function(){
        order.originalState = order.status;
        if(order.status === 'returned'){
            adminSharedService.setReturned(order); 
        }
        $scope.showUpdateAlert=true;
        $scope.alert='Order Status Updated Successfully'
            $timeout(function(){
                $scope.showUpdateAlert=false;
            },2000)  
       }).catch(function(){
            $scope.showErrorAlert=true;
             $scope.alert='Error Updating Order Status'
            $timeout(function(){
                $scope.showErrorAlert=false;   
            },2000)
       })
    }
     
        
        
    
})