adminApp.service("adminSharedService",function(){
    let itemToEdit = null;
    let returnedOrder=null;

    this.setItem = function(item) {
        itemToEdit = item;
    };

    this.getItem = function() {
        return itemToEdit;
    };

    this.clearItem = function() {
        itemToEdit = null;
    };
    
    this.setReturned=function(order){
        returnedOrder=order
    }
    this.getReturned=function(){
        return returnedOrder
    }
    this.clearReturned=function(){
        returnedOrder=null
    }
    })