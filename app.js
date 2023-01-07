var app=angular.module("FundooApp",['ngRoute','ngStorage','ngTouch','ngAnimate','ui.bootstrap']);

app.config(["$routeProvider",function($routeProvider){
    
$routeProvider.
when("/login",{
    templateUrl:"Components/login.html",
    controller:"fundoologinCtrl"
}).
when("/register",{
    templateUrl:"Components/register.html",
    controller:"fundooRegCtrl"
}).
when("/Dashboard",{
    templateUrl:"Components/dashboard.html"
})
.when("/Notes",{
        templateUrl:"Components/dashboard.html"
}).
when("/Archive",{
        templateUrl:"Components/Dashboard/ArchiveNotes.html"        
}).
when("/Trash",{
    templateUrl:"Components/Dashboard/Trash.html"
}).
when("/Labels",{
    templateUrl:"Components/Dashboard/Labels.html"
}).
otherwise({
redirectTo:"/login"
});
}]);












//$routeprivder-services





