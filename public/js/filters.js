'use strict';

angular.module('myApp.filters', [])
    .filter('time', ['$filter', function($filter){
        return function(input){
            //TODO: Replace this code
            return $filter('date')(input);
        };
    }]);