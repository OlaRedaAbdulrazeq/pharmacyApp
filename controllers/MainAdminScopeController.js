adminApp.run(function($rootScope,$location){
    $rootScope.isActive = function(route){
        if(route === '/') {
            return $location.path() === '/';
        }
    return $location.path().startsWith(route);
}
 $rootScope.logOut = function () {
    localStorage.removeItem("currentUser");
    window.location.replace("index.html");  };
})