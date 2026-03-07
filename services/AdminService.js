const Base_URL = 'https://qiwuggzywsrdvyeaoxcn.supabase.co/rest/v1'
const config={
    headers:{
                "apikey":'sb_publishable_HqYfKerPcU_9wkbeyl08Wg_dw4eEwgY',
                "Authorization": "Bearer sb_publishable_HqYfKerPcU_9wkbeyl08Wg_dw4eEwgY",
                'Content-Type':'application/json',
                'prefer':'return=representation'
            }
}
adminApp.service('adminService',function($http){
    // CRUD ON PRODUCTS TABLE
    this.addItem=function(item){
        return $http.post(Base_URL+'/products',item,config)
    }
    this.getItems=function(){
        return $http.get(Base_URL+'/products',config)
    }
    this.deleteItem=function(id){
            const updatedItem = { deleted: true };
            return $http.patch(Base_URL+'/products?id=eq.'+id, updatedItem, config);
    }
    this.updateItem=function(id,updatedItem){
        return $http.patch(Base_URL+'/products?id=eq.'+id,updatedItem,config)
    } 
    this .getCustomers=function(){
        return $http.get(Base_URL+'/customers',config)
    }
    this .getOrders=function(){
        return $http.get(Base_URL+'/orders',config)
    }
    this.getAllCustomersPurchases=function(){
        return $http.get(Base_URL+`/customers?select=name,role,orders(date,total,status,purchases(quantity,price,products(name)))`,config)
    }
    this.getPurchasedItems = function(){
    return $http.get(Base_URL + "/purchases?select=quantity,products(category)", config);
    }
    this.getOrders=function(){
        return $http.get(Base_URL+`/orders?select=id,date,total,returned,status,customers(name)`,config)
    }
    this.modifyOrderStatus=function(id,updatedStatus){
        return $http.patch(Base_URL+`/orders?id=eq.`+id,updatedStatus,config)
    }
    this.getOutOfStock=function(){
        return $http.get(Base_URL+`/products?quantity=eq.0`,config)
    }
})
