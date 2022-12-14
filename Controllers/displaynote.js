app.controller("fundooFetchCtrl",function($scope,$http){
   
  $scope.postNote=function(title,note){
      const HeaderConfig={
          headers:{
              Authorization:"Bearer " + localStorage.getItem("token")
          }
      }
      var data={
        title: title,
        note: note
      }
      //call the service
      
      $http.get(`https://localhost:44365/api/Notes/ByUser?userid=${id}`,JSON.stringify(data),null,HeaderConfig)
      .then(function(response){
          console.log(response);
          if(response.data){
              $scope.title=response.data.title;
              $scope.note=response.data.note;
          }
      },function(error){
          console.log(error)
      })
  };
})
