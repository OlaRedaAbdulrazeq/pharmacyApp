adminApp.controller("AdminViewPurchasesController",function($scope,adminService){
    $scope.isLoading = true
    adminService.getPurchasedItems()
    .then(function(response){

        let purchases = response.data;

        let categoryTotals = {};

        purchases.forEach(function(item){

            let category = item.products.category;

            if(!categoryTotals[category]){
                categoryTotals[category] = 0;
            }

            categoryTotals[category] += item.quantity;

        });

        console.log(categoryTotals);

        drawCategoryChart(categoryTotals);

    })
    .catch(function(e){
        console.error(e);
    })
    .finally(()=>$scope.isLoading=false)

    function drawCategoryChart(data){

    let labels = Object.keys(data);
    let values = Object.values(data);

    const ctx = document.getElementById("categoryChart");

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Purchased Items",
                data: values,
                backgroundColor: [
                    "#198754",
                    "#0071bc",
                    "#ffc107",
                    "#dc3545"
                ],
                maxBarThickness: 90
            }]
        },
        options:{
            responsive:true,
            plugins:{
                legend:{
                    display:false
                }
            }
        }
    });

}
})
