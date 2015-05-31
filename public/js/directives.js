'use strict';

angular.module('myApp.directives', [])
    .directive('comments', [function(){
        return {
            restrict: 'E',
            replace: true,
            templateUrl : 'templates/directives/comments.html',
            scope : {},
            link : function(scope, element){
                //TODO: Add your code
            }
        }
    }]);
