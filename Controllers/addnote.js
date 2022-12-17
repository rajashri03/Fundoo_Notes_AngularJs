app.component('sideBar', {  
  templateUrl: "Components/Dashboard/sidebar.html",
});


app.component('headerList', {  
  templateUrl: "Components/Dashboard/header.html",
});


app.component('takeNote', {  
  templateUrl: "Components/Dashboard/takeNoteOneTwo.html",
});

app.component('noteList', {  
  templateUrl: "Components/Dashboard/addednotes.html",
  }).controller("fundooappCtrl",function($scope,$http){
    const HeaderConfig={
        headers:{
            Authorization:"Bearer " + localStorage.getItem("token")
        }
    }

    
    $scope.EditModal = function(user) {
      $scope.form_name = 'Edit User Information';
  var edit_form = {};
  angular.copy(user, edit_form);
  $scope.users_form = edit_form;
  $scope.users_form.dob = new Date($scope.users_form.dob);		
      $('#form_modal').modal('show');
  };
    
//For pin
$scope.pinData=function(noteID){
    var datanote={
        noteID: noteID
      }
      $scope.noteID=noteID;
      console.log( $scope.noteID);
    $http.put(`https://localhost:44365/api/Notes/Pin?noteid=${noteID}`,null,HeaderConfig)
    .then(function(response){
      //$scope.somearray=response.data;
        console.log(response); 
       //console.log($scope.somearray.data);
       window.location.reload();
    },function(error){
        console.log(error)
    })
  };

      
//For Archive
$scope.archivedata=function(noteID){
    var datanote={
        noteID: noteID
      }
      $scope.noteID=noteID;
      console.log( $scope.noteID);
    $http.put(`https://localhost:44365/api/Notes/Archive?noteid=${noteID}`,null,HeaderConfig)
    .then(function(response){
      //$scope.somearray=response.data;
        console.log(response); 
       //console.log($scope.somearray.data);
       window.location.reload();  
    },function(error){
        console.log(error)
    })
  };

      
//For Delete
$scope.deleteData=function(noteID){
    var datanote={
        noteID: noteID
      }
      $scope.noteID=noteID;
      console.log( $scope.noteID);
    $http.delete(`https://localhost:44365/api/Notes/Remove?noteid=${noteID}`,HeaderConfig)
    .then(function(response){
      //$scope.somearray=response.data;
        console.log(response); 
       //console.log($scope.somearray.data);
       window.location.reload(); 
    },function(error){
        console.log(error)
    })
  };

      
//For Trash
$scope.Trashdata=function(noteID){
    var datanote={
        noteID: noteID
      }
      $scope.noteID=noteID;
      console.log( $scope.noteID);
    $http.put(`https://localhost:44365/api/Notes/Trash?noteid=${noteID}`,null,HeaderConfig)
    .then(function(response){
      //$scope.somearray=response.data;
        console.log(response); 
       //console.log($scope.somearray.data);
       window.location.reload();
    },function(error){
        console.log(error)
    })
  };



//---TO display Note
    $scope.displayData=function(){
        $http.get("https://localhost:44365/api/Notes/ByUser",HeaderConfig)
        .then(function(response){
          $scope.somearray=response.data;
          console.log($scope.notid);
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
            window.location.reload();
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
