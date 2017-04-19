
//TODO give focus to edit field on click
//TODO In-place editing of task
//     - bootstrap a 
//TODO Add detailed modal view, change input, allow in-place editing of details, add fancy editing
//TODO re-order tasks
//TODO sub tasks
/*
	GLOSSARY
	todoList: refers to the whole object (the model and operations on that model)
		todos: refers to the model only 
	

*/
/*global angular*/
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.substring(1);
}

function isDone(todo) {
    return todo.done;
}



angular.module('app', ['ngSanitize'])
    .filter('capFirstLetter', function() {
        return capitalizeFirstLetter;
    })
    .factory('todoService', function($http) {
        //HTTP requests go here
        let todoService = {
            getTodos: function() {
                return $http.get('tasks.json');
            }
        };
        return todoService;
    })
    .controller('TodoListController', ['$scope', '$sanitize', 'todoService', function($scope, $sanitize, todoService) {
        $scope.MAX = 5;
        $scope.task = "";

        todoService.getTodos().then(function(res) {
            $scope.todos = res.data;
        });

        $scope.plusIconCss = { //pivot on isMaxedOut
            true: 'notClickable text-muted',
            false: 'clickable text-success'
        };

        $scope.placeholderMessages = {
            true: `No more than ${$scope.MAX} tasks`,
            false: 'Add a new task'
        };

        $scope.isMaxedOut = false;

        //FIXME: don't allow dups to be added
        $scope.addTask = function() {
            $scope.task = $sanitize($scope.task);
            if (!$scope.task) return;
            if ($scope.todos.includes($scope.task)) return;

            $scope.todos.push({
                text: $scope.task,
                done: false
            });
            $scope.task = "";
            if ($scope.todos.length === $scope.MAX) $scope.isMaxedOut = true;
        }


        $scope.removeTask = function(task) {
            $scope.todos = $scope.todos.filter((todo) => todo.text != task.text);
            $scope.isMaxedOut = false;
        }

        $scope.buyComparator = function(a, b) {
            if (a.value.toLowerCase().startsWith('buy')) return 1;
            if (b.value.toLowerCase().startsWith('buy')) return -1;
            return 1;
        };
    }]);
