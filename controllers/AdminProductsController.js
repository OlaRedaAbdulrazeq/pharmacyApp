adminApp.controller("AdminProductsController",function($scope,$location,adminService,adminSharedService){
       $scope.isLoading=true

    $scope.goToNewProduct=function(){
        $location.path("/products/add-item")
    }
    adminService.getItems()
    .then(function(response){
        $scope.products=response.data
    })
    .catch(function(){
        console.error("Error getting data")
    })
    .finally(()=>$scope.isLoading=false)
    $scope.editItem=function(itm){
       adminSharedService.setItem(itm)
        $location.path("/products/add-item")
    }
   
    $scope.prepareDelete=function(itm){
        $scope.itemToDelete = itm;
    }
    $scope.deleteItem=function(id){
        adminService.deleteItem(id)
        .then(function(){
            $scope.products = $scope.products.map(item => 
            item.id === id ? {...item, deleted: true} : item
        )
        const modalEl = document.getElementById('confirmDeleteModal');
            const modal = bootstrap.Modal.getInstance(modalEl); 
            modal.hide();
        })
        .catch(function() {
        $scope.showErrorAlert = true;
        $timeout(() => $scope.showErrorAlert = false, 2000);

        })
    }

    $scope.sortField=''
    $scope.sortHigh=function(){
        $scope.sortField='-price'
    }
    $scope.sortLow=function(){
        $scope.sortField='price'
    }
})