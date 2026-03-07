adminApp.controller("AdminOutOfStockController",function($scope,adminService){
    $scope.isLoading=true
    $scope.outOfStock=[]
    adminService.getOutOfStock()
    .then(function(response){
        if(!response.data[0]){
            return
        }
        else{
            $scope.outOfStock=response.data
        }
        

    }).catch(e=>console.error(e))
    .finally(()=>$scope.isLoading=false)
})