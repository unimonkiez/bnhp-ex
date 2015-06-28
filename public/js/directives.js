'use strict';

angular.module('myApp.directives', [])
    .directive('comments', ['Comments', 'commentsMaxLevel', function(Comments, commentsMaxLevel) {
        return {
            restrict: 'E',
            templateUrl: 'templates/directives/comments.html',
            scope: {
                list: '=?',
                level: '=?'
            },
            controller: ['$attrs', function($attrs) {
                this.commentsMaxLevel = Number($attrs.commentsMaxLevel || commentsMaxLevel);
            }],
            link: function(scope, element, attrs) {
                if (attrs.list === undefined || attrs.level === undefined) {
                    Comments.getList('777AAA').then(function(list) {
                        scope.list = list;
                        console.log(list);
                    });
                    scope.level = 1;
                }
            }
        }
    }])
    .directive('comment', ['Comments', '$compile', function(Comments, $compile) {
        return {
            restrict: 'E',
            templateUrl: 'templates/directives/comment.html',
            scope: {
                comment: '=?',
                level: '=?'
            },
            require: '^comments',
            link: function(scope, element, attrs, commentsCtrl) {
                var commentsExists = false;
                scope.$watchCollection('comment.comments', function(newVal) {
                    var elementChanged = false;
                    if (!commentsExists && Array.isArray(newVal) && newVal.length > 0 && scope.level < commentsCtrl.commentsMaxLevel) {
                        commentsExists = true;
                        var elementStr = '<comments list="comment.comments" level="level + 1" comments-max-level="' + commentsCtrl.commentsMaxLevel + '"></comments>';
                        $compile(elementStr)(scope, function(newElement){
                            element.children().append(newElement);
                        });
                    } else if (commentsExists && (!Array.isArray(newVal) || newVal.length === 0 || scope.level >= commentsCtrl.commentsMaxLevel)) {
                        commentsExists = false;
                        element.find('>div>comments').remove();
                    }
                });
                scope.reply = function() {
                    scope.comment.comments.push(new Comments({
                        txt: 'Text text text text'
                    }));
                }
            }
        }
    }])
    .constant('commentsMaxLevel', 5);
