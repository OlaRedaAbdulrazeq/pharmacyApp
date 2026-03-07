adminApp.controller("AdminAddProductController",function($scope,$timeout,$location,adminService,adminSharedService){
        
        $scope.showAlert=false;
        $scope.showUpdateAlert=false;
        $scope.showErrorAlert=false;
        $scope.alert=''
        $scope.showEdit=false;
        
    $scope.clearForm=function(){
        $scope.productForm.$setUntouched();
        $scope.name = '';
        $scope.description = '';
        $scope.imgUrl = '';
        $scope.price = '';
        $scope.quantity = '';
        $scope.category='';
    }  
    $scope.submit=function(){
        const item={
        name: $scope.name,
        description: $scope.description,
        price:Number($scope.price) ,
        quantity:Number($scope.quantity),
        imgUrl:$scope.imgUrl,
        category: $scope.category
    };
    adminService.addItem(item)
    .then(function (response) {
            $scope.showAlert = true;
            $scope.alert='Product Added Successfully!'
            $scope.clearForm();
            $timeout(function() {
                $scope.showAlert = false
                $location.path("/products");
            } , 800);
            
    })
    .catch(function(error){
        console.error("Add Item Error:", error);
        $scope.showErrorAlert = true;
        $timeout(() => $scope.showErrorAlert = false, 2000);
        $scope.alert='Error Adding Product!'
    })
    }
   
    let itemToEdit=adminSharedService.getItem();
       if(itemToEdit){
        $scope.showEdit = true;
        $scope.name = itemToEdit.name;
        $scope.description = itemToEdit.description;
        $scope.price = itemToEdit.price;
        $scope.quantity = itemToEdit.quantity;
        $scope.category = itemToEdit.category;
        $scope.imgUrl = itemToEdit.imgUrl;
        $scope.id = itemToEdit.id;
       }

     $scope.edit=function(){
        const UpdatedItem={
            name: $scope.name,
            description: $scope.description,
            price: Number($scope.price),
            quantity: Number($scope.quantity),
            imgUrl: $scope.imgUrl,
            category: $scope.category
        }
        adminService.updateItem($scope.id, UpdatedItem)
        .then(function(){
            $scope.showUpdateAlert=true;
            $scope.alert='Product Updated Successfully!'
            $scope.clearForm();
            $timeout(() => $scope.showUpdateAlert = false, 2000);
        })
        .catch(function () {
            $scope.showErrorAlert = true;
            $timeout(() => $scope.showErrorAlert = false, 2000);
            $scope.alert='Error Adding Product!'
        })
        .finally(function () {
            adminSharedService.clearItem();
            $timeout(() => $location.path('/products'), 500);
        });
    }
     $scope.cancel=function(){
        adminSharedService.clearItem();
        $timeout(() => $location.path('/products'), 50);
    }
})
