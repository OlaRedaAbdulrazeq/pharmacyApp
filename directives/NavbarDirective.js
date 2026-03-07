adminApp.directive('customNavbar',function(){
    return{
        template: `<nav class="d-flex justify-content-between align-items-baseline px-md-5 py-2 position-sticky p-1" style='cursor:pointer'>
                    <div><span class='text-blue'>PHARMACARE</span></div>
                    <div class='pb-4'>
                        <i class="bi bi-person fs-3" data-bs-toggle="dropdown"></i>
                        <span><b>Hello,Admin</b></span>
                        <i class="bi bi-box-arrow-right fs-5 ms-3" ng-click="logOut()"></i>
                    </div>
                    </nav>
                `
    }
})