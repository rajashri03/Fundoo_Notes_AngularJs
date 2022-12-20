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
  });
  
  app.controller("fundooappCtrl",function($scope,$http,$uibModal){
    const HeaderConfig={
        headers:{
            Authorization:"Bearer " + localStorage.getItem("token")
        }
    }

    
    
    
 $scope.openModal = function(noteID,title,note,color,isArchive,isPin){
  user={
    noteID:noteID,
      title:title,
      note:note,
      color:color,
      isArchive:isArchive,
      isPin:isPin
  }
  $scope.modalInstance = $uibModal.open({
  ariaLabelledBy: 'modal-title',
  ariaDescribedBy: 'modal-body',
  templateUrl: 'window.html',
  controller :'ModelHandlerController',
  controllerAs: '$ctrl',
  size: 'md',
  resolve: {
  user:function(){
    return user;
  }
  }
  });
 
  }
  
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


  //Update note
  $scope.UpdateNote=function(noteID,title,note,color,isArchive,isPin){
     
    var data1={
      noteID:noteID,
      title: title,
      note: note,
      color:color,
      isArchive:isArchive,
      isPin:isPin
    }
    //call the service
    
    $http.put(`https://localhost:44365/api/Notes/Update?noteid=${noteID}`,JSON.stringify(data1),HeaderConfig)
    .then(function(response){
        console.log(response);
        if(response.data1){
          window.location.reload();
            $scope.msg="Post Data Submitted";
            $scope.title=response.data1.title;
            $scope.note=response.data1.note;
            $scope.color=response.data1.color;
            $scope.image= response.data1.image;
            $scope.isArchive= response.data1.isArchive;
            $scope.isPin= response.data1.isPin;

        }
    },function(error){
        console.log(error)
    })
};

  
  
})

app.controller("ModelHandlerController",function($scope,$uibModalInstance,$http){
 $scope.title=user.title;
 $scope.note=user.note;
 $scope.noteID=user.noteID;
 $scope.color=user.color;
 $scope.isArchive=user.isArchive;
 $scope.isPin=user.isPin;
  $scope.cancelModal = function(){
  console.log("cancelmodal");
  $uibModalInstance.dismiss('close');
  }
  $scope.ok = function(){
  $uibModalInstance.close('save');
  
  }
  
 });