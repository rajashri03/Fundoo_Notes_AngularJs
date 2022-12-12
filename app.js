var app=angular.module("FundooApp",['ngRoute','ngStorage']);

app.config(["$routeProvider,$httpProvider",function($routeProvider,$httpProvider){
    $httpProvider.defaults.useXDomain = true;

    delete $httpProvider.defaults.headers.common['X-Requested-With'];

$routeProvider.
when("/login",{
    templateUrl:"Components/Login/login.html"
}).
when("/register",{
    templateUrl:"Components/Register/register.html"
}).
when("/Dashboard",{
    templateUrl:"Components/Dashboard/dashboard.html"
}).
otherwise({
redirectTo:"/login"
});
}]);
app.controller("fundooappCtrl",function($scope,$http,$localStorage,$location){
      //-----Takenote one and two
      var note=this;
      note.toggle=false;
      $scope.showButtons = [0];
      $scope.toggle1 = function() {
        $scope.showButtons = [1];
    };
    $scope.postNote=function(title,note){
        var data={
          title: title,
          note: note,
        }
        //call the service
        $http.post("https://localhost:44365/api/Notes/Add",JSON.stringify(data))
        .then(function(response){
            console.log(response);
    
            if(response.data){
                $scope.msg="Post Data Submitted";
              
                $scope.title=response.data.title;
                $scope.note=response.data.note;
            }
        },function(error){
            console.log(error)
        })
    };
   //Login js-------------------------------------------------
    $scope.login=function(email, password){
        var data={
            email:email,
            password:password
        }
        //call the service
        $http.post("https://localhost:44365/api/User/Login",JSON.stringify(data))
        .then(function(response){
            console.log(response);

            if(response.data){
                $localStorage.message=response.data.data;
                console.log($localStorage.message);
                $location.path('/Dashboard');
                $scope.email=response.data.email;
                $scope.password=response.data.password;
            }
        },function(error){
            console.log(error)
        })
    };

     //Register js-------------------------------------------------
    $scope.postdata=function(firstName,lastName,email, password){
        var data={
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:password
        }
        //call the service
        $http.post("https://localhost:44365/api/User/Add",JSON.stringify(data))
        .then(function(response){
            console.log(response);
            if(response.data){
                $scope.msg="Post Data Submitted";
                $scope.firstName=response.data.firstName;
                $scope.lastName=response.data.lastName;
                $scope.email=response.data.email;
                $scope.password=response.data.password;
            }
        },function(error){
            console.log(error)
        })
    };

  
})

//$routeprivder-services