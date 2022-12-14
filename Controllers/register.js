app.controller("fundooRegCtrl",function($scope,$http){
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
               $scope.msg="User Added Successfully";
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
 