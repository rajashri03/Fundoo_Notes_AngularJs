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

app.controller("fundooappCtrl", function ($scope, $http,$uibModal) {

  $scope.labelView = [0];
  $scope.collabarray=[];


  
  const HeaderConfig = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  }
   



  //label
$scope.pop = [0]
$scope.popper = function (noteID) {
    noteToTrash = noteID
    if ($scope.pop.includes(0)) {
        $scope.pop = [1];
    }
    else {
        $scope.pop = [0]
    }
}; 

$scope.addLabel = function(noteID) {
  $scope.labelNote = noteID
  console.log($scope.labelNote);
  if ($scope.labelView.includes(0)) {
      $scope.labelView = [1];
      console.log($scope.labelView)
  }
  else {
      $scope.labelView = [0]
      
  }
  console.log("Labels")
}
$scope.setLabel = function (noteID,labelName){
  
  var data1 = {
    labelName: labelName,
    noteID: noteID
  }
  console.log("Setlabel"+name  + $scope.labelNote);
  $http.post(`https://localhost:44365/api/Label/Add?noteid=${noteID}&labelss=${labelName}`, null, HeaderConfig)
  .then(function (response)
  {
    console.log(response);
      if (response.data1)
      {  $scope.allLabels = response.data1.data
          console.log("label res"+response.data1)
          window.location.reload();
          $scope.labelView = [0]
          $scope.pop = [0]
          $scope.refreshWindow();
      }
      
  }, function (error){
      console.log(error)
  })
}
  //Collaborator popup  
  $scope.openCollabModal = function (noteid) {
    user = {
      noteid: noteid
    }
    $scope.modalInstance = $uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'collabwindow.html',
      controller: 'CollabController',
      controllerAs: '$ctrl',
      size: 'md',
      resolve: {
        user: function () {
          return user;
        }
      }
    });

  }


  //Collaborator
  $scope.CollabNote = function (collabEmail, noteid) {

    var data1 = {
      collabEmail: collabEmail,
      noteid: noteid
    }
    //call the service

    $http.post(`https://localhost:44365/api/Collab/Add?noteid=${noteid}&email=${collabEmail}`, JSON.stringify(data1), HeaderConfig)
      .then(function (response) {
        console.log(response);
        if (response.data1) {
          window.location.reload();
          $scope.msg = "Post Data Submitted";
          $scope.collabEmail = response.data1.collabEmail;
          $scope.noteid = response.data1.noteid;
        }
      }, function (error) {
        console.log(error)
      })
  };

  //Update popup  
  $scope.openModal = function (noteID, title, note, color, isArchive, isPin) {
    user = {
      noteID: noteID,
      title: title,
      note: note,
      color: color,
      isArchive: isArchive,
      isPin: isPin
    }
    $scope.modalInstance = $uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'window.html',
      controller: 'ModelHandlerController',
      controllerAs: '$ctrl',
      size: 'md',
      resolve: {
        user: function () {
          return user;
        }
      }
    });

  }


  //Update note
  $scope.UpdateNote = function (noteID, title, note, color, isArchive, isPin) {

    var data1 = {
      noteID: noteID,
      title: title,
      note: note,
      color: color,
      isArchive: isArchive,
      isPin: isPin
    }
    //call the service

    $http.put(`https://localhost:44365/api/Notes/Update?noteid=${noteID}`, JSON.stringify(data1), HeaderConfig)
      .then(function (response) {
        console.log(response);
        if (response.data1) {
          window.location.reload();
          $scope.msg = "Post Data Submitted";
          $scope.title = response.data1.title;
          $scope.note = response.data1.note;
          $scope.color = response.data1.color;
          $scope.image = response.data1.image;
          $scope.isArchive = response.data1.isArchive;
          $scope.isPin = response.data1.isPin;

          $uibModalInstance.close('save');
        }
      }, function (error) {
        console.log(error)
      })
  };

  //For pin
  $scope.pinData = function (noteID) {
    var datanote = {
      noteID: noteID
    }
    $scope.noteID = noteID;
    console.log($scope.noteID);
    $http.put(`https://localhost:44365/api/Notes/Pin?noteid=${noteID}`, null, HeaderConfig)
      .then(function (response) {
        //$scope.somearray=response.data;
        console.log(response);
        //console.log($scope.somearray.data);
        window.location.reload();
      }, function (error) {
        console.log(error)
      })
  };


  //For Archive
  $scope.archivedata = function (noteID) {
    var datanote = {
      noteID: noteID
    }
    $scope.noteID = noteID;
    console.log($scope.noteID);
    $http.put(`https://localhost:44365/api/Notes/Archive?noteid=${noteID}`, null, HeaderConfig)
      .then(function (response) {
        //$scope.somearray=response.data;
        console.log(response);
        //console.log($scope.somearray.data);
        window.location.reload();
      }, function (error) {
        console.log(error)
      })
  };


  //For Delete
  $scope.deleteData = function (noteID) {
    var datanote = {
      noteID: noteID
    }
    $scope.noteID = noteID;
    console.log($scope.noteID);
    $http.delete(`https://localhost:44365/api/Notes/Remove?noteid=${noteID}`, HeaderConfig)
      .then(function (response) {
        //$scope.somearray=response.data;
        console.log(response);
        //console.log($scope.somearray.data);
        window.location.reload();
      }, function (error) {
        console.log(error)
      })
  };


  //For Trash
  $scope.Trashdata = function (noteID) {
    var datanote = {
      noteID: noteID
    }
    $scope.noteID = noteID;
    console.log($scope.noteID);
    $http.put(`https://localhost:44365/api/Notes/Trash?noteid=${noteID}`, null, HeaderConfig)
      .then(function (response) {
        //$scope.somearray=response.data;
        console.log(response);
        //console.log($scope.somearray.data);
        window.location.reload();
      }, function (error) {
        console.log(error)
      })
  };

  //Display Collab
  // $scope.displayCollabData=function(){
  //   var data={
  //     noteid:noteid
  //   }
  // };

  //---TO display Note

  var vm = this;
  // accessible in template 
  vm.doSomething = "";
  $scope.displayData = function () {

    $http.get("https://localhost:44365/api/Label/getByUser", HeaderConfig)
        .then(function (response){
            console.log("kk"+response)
            $scope.allLabels = response.data
        }, function (error){
            console.log(error)
        })
    $http.get("https://localhost:44365/api/Notes/ByUser", HeaderConfig)
      .then(function (response) {
        $scope.somearray = response.data;
       
        console.log(response);
        angular.forEach($scope.somearray, function(id) {
          console.log(id.noteID)
          $http.get(`https://localhost:44365/api/Collab/ByNoteId?noteid=${id.noteID}`, HeaderConfig)
          .then(function (response1) {
              $scope.collabarray.push(response1.data[0])
              console.log(response1.data[0])
          }, function (error)
          {
              console.log(error)
          })
      });
      //  // console.log("noteid--" + response.data[0].noteID);
      //  for(var i=0;i<$scope.somearray.length;i++)
      //   {
      //    vm.doSomething = response.data[i].noteID;
        
      //   console.log("inside" + vm.doSomething);
      
      // $http.get(`https://localhost:44365/api/Collab/ByNoteId?noteid=${vm.doSomething}`, HeaderConfig)
      // .then(function (response1) {
      //   $scope.collabarray =response1.data;
      //   console.log(response1);
      //   console.log($scope.collabarray);
      //   console.log("hiii");
        
      // }, function (error) {
      //   console.log(error)
       //})
    //}
      }, function (error) {
        console.log(error)
      })
  };


  //-----Takenote one and two
  var note = this;
  note.toggle = false;
  $scope.showButtons = [0];
  $scope.toggle1 = function () {
    $scope.showButtons = [1];
  };

  $scope.colorArray = ["LightSalmon","Pink","PapayaWhip","Khaki","Lavender","Thistle","GreenYellow","Aquamarine","BlanchedAlmond","Gainsboro","AliceBlue"]
  $scope.colorPop = [0]
  $scope.colorPopup = function () {
    console.log("Color");
      if ($scope.colorPop.includes(0)) {
          $scope.colorPop = [1];
      }
      else {
          $scope.colorPop = [0]
      }
  };
  $scope.changeColor = function (noteID, color){
    console.log(color)
    $http.put(`https://localhost:44365/api/Notes/Color?noteid=${noteID}&color=${color}`, null, HeaderConfig)
        .then(function (response) {
            console.log(response)
        }, function (error) {
            console.log(error)
        })
        window.location.reload()
}



  //-----TO add note
  $scope.postNote = function (title, note) {

    var data = {
      title: title,
      note: note
    }
    //call the service

    $http.post("https://localhost:44365/api/Notes/Add", JSON.stringify(data), HeaderConfig)
      .then(function (response) {
        console.log(response);
        if (response.data) {
          window.location.reload();
          $scope.msg = "Post Data Submitted";
          $scope.title = response.data.title;
          $scope.note = response.data.note;
          $scope.userid = response.data.userid;

        }
      }, function (error) {
        console.log(error)
      })
  };




})


//Update popup
app.controller("ModelHandlerController", function ($scope, $uibModalInstance) {
  $scope.title = user.title;
  $scope.note = user.note;
  $scope.noteID = user.noteID;
  $scope.color = user.color;
  $scope.isArchive = user.isArchive;
  $scope.isPin = user.isPin;
  $scope.cancelModal = function () {
    console.log("cancelmodal");
    $uibModalInstance.dismiss('close');
  }
  $scope.ok = function () {
    $uibModalInstance.close('save');

  }

});



//Collab popup
app.controller("CollabController", function ($scope, $uibModalInstance, $http) {
  $scope.collabEmail = user.collabEmail;
  $scope.noteid = user.noteid;
  $scope.cancelModal = function () {
    console.log("cancelmodal");
    $uibModalInstance.dismiss('close');
  }
  $scope.ok = function () {

    $uibModalInstance.close('save');

  }

});