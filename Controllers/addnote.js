app.
component('noteList', {  // This name is what AngularJS uses to match to the `<phone-list>` element.
  templateUrl: "Components/addednotes.html",
  }).controller("fundooappCtrl",function($scope,$http){
    const HeaderConfig={
        headers:{
            Authorization:"Bearer " + localStorage.getItem("token")
        }
    }
//---TO display Note
    $scope.displayData=function(){
        $http.get("https://localhost:44365/api/Notes/ByUser",HeaderConfig)
        .then(function(response){
          $scope.somearray=response.data;
            console.log(response); 
           //console.log($scope.somearray.data);
            
        },function(error){
            console.log(error)
        })
      };



    //-----Takenote one and two
    var note=this;
    note.toggle=false;
    $scope.showButtons = [0];
    $scope.toggle1 = function() {
      $scope.showButtons = [1];
  };
  

  
 //-----TO add note
  $scope.postNote=function(title,note){
     
      var data={
        title: title,
        note: note
      }
      //call the service
      
      $http.post("https://localhost:44365/api/Notes/Add",JSON.stringify(data),HeaderConfig)
      .then(function(response){
          console.log(response);
          if(response.data){
              $scope.msg="Post Data Submitted";
              $scope.title=response.data.title;
              $scope.note=response.data.note;
              $scope.userid=response.data.userid;

          }
      },function(error){
          console.log(error)
      })
  };

  
  
})
