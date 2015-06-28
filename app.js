// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('todo', ['ionic', 'firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})


.factory('Groups', function($firebaseArray) {
    var projectsRef = new Firebase("https://testso1.firebaseio.com/items");
    return $firebaseArray(projectsRef)
})

.factory('Projects', function() {
  return {
    all: function(savegroup) {
      console.log('hi')
      console.log(savegroup)
      group_json = angular.fromJson(savegroup)
      return group_json
    },
    save: function(allprojects, savegroup, projectTitle) {
      console.log(savegroup + "savegroup")
      savegroup.$add({
        "group_name": projectTitle
      });
      allprojects.projects = savegroup
    },
    newProject: function(projectTitle) {
      // Add a new project
      return {
        title: projectTitle,
        tasks: []
      };
    }
  }
})

.controller('TodoCtrl', function($scope, $timeout, $ionicModal, Groups, Projects, $ionicSideMenuDelegate) {
// A utility function for creating a new project
  // with the given projectTitle

  $scope.groups = Groups;


  var createProject = function(projectTitle) {
    var newProject = Projects.newProject(projectTitle);
    // $scope.projects.push(newProject);
    Projects.save($scope.projects, $scope.groups, projectTitle);
    $scope.selectProject(newProject, $scope.projects.length-1);
  }


  // Load or initialize projects
  $scope.projects = Projects.all($scope.groups);

  // Grab the first project
  $scope.activeProject = $scope.projects[0];

  // Called to create a new project
  $scope.newProject = function() {
    var projectTitle = prompt('Project name');
    if(projectTitle) {
      createProject(projectTitle);
    }
  };

  // Called to select the given project
  $scope.selectProject = function(project, index) {
    $scope.activeProject = project;
    project_key = $scope.projects.$keyAt(index)
    $scope.activeProjectRef = $scope.projects.$ref().child(project_key)
    $ionicSideMenuDelegate.toggleLeft(false);
  };

  // Create our modal
  $ionicModal.fromTemplateUrl('new-task.html', function(modal) {
    $scope.taskModal = modal;
  }, {
    scope: $scope
  });

  $scope.createTask = function(task) {
    if(!$scope.activeProject || !task) {
      return;
    }
    $scope.activeProjectRef.child("Tasks").push({
      title: task.title,
      username: task.username
    });

    $scope.taskModal.hide();
    task.title = "";
  };

  $scope.newTask = function() {
    $scope.taskModal.show();
  };

  $scope.closeNewTask = function() {
    $scope.taskModal.hide();
  }

  $scope.toggleProjects = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

 $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
};
  // Try to create the first project, make sure to defer
  // this by using $timeout so everything is initialized
  // properly
  // $timeout(function() {
  //   if($scope.projects.length == 0) {
  //     while(true) {
  //       var projectTitle = prompt('Your first project title:');
  //       if(projectTitle) {
  //         createProject(projectTitle);
  //         break;
  //       }
  //     }
  //   }
  // });
});
