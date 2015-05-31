'use strict';

angular.module('myApp.services', [])
    .factory('Comments', ['$timeout', '$q', function($timeout, $q){
        /**
         * MOCKS
         ********/

        /**
         * create mock date
         * @param msec {Integer} time in milliseconds
         * @returns {string} - Date in ISO8601 format
         */
        var createdAt = function(msec){
            msec = msec || 0;

            var d = new Date(Date.now() - msec);
            return d.toISOString();
        };

        // list of mocks author objects
        var authors = [
            {
                id : 1,
                fName : 'Jaga',
                lName : 'Cohen',
                image : 'images/users/1.png'
            },
            {
                id : 2,
                fName : 'Kihari',
                lName : 'Levi',
                image : 'images/users/2.png'
            },
            {
                id : 3,
                fName : 'David',
                lName : 'Kaplan',
                image : 'images/users/3.png'
            }
        ];

        // list of mocks comment objects
        var comments = [
            {
                author : authors[0],
                comments : [
                    {
                        author : authors[1],
                        comments : [
                            {
                                author : authors[0],
                                comments : [
                                    {
                                        author : authors[1],
                                        comments : [
                                            {
                                                author : authors[0],
                                                comments : [],
                                                txt : 'ah ok thats why i recognized it!! awesome!',
                                                createdAt : createdAt(1000 * 30 * 2)
                                            }
                                        ],
                                        txt : 'It\'s from "jungledyret", which is a really cute movie but sadly has very unfortunate voice acting, otherwise it would be much better film!',
                                        createdAt : createdAt(1000 * 60 * 60 * 23)
                                    }
                                ],
                                txt : 'Whats is from?',
                                createdAt : createdAt(1000 * 60 * 60 * 23)
                            }
                        ],
                        txt : 'Thanks you :3',
                        createdAt : createdAt(1000 * 60 * 60 * 24 * 16)
                    }
                ],
                txt : 'Cute avatar!',
                createdAt : createdAt(1000 * 60 * 60 * 24 * 31 * 2)
            },
            {
                author : authors[1],
                comments : [],
                txt : 'testan',
                createdAt : createdAt(1000 * 30)
            }
        ];

        /**
         * Constructor
         * @param data {Object} comment data object {txt : String}
         * @constructor
         */
        var Comments = function(data){
            this.author = authors[2];
            this.txt = data.txt || '';
            this.createdAt = data.createdAt || new Date();
            this.comments = [];

            if (data.comments){
                for (var i = 0; i < data.comments.length; i++) {
                    var data = data.comments[i];
                    this.comments.push(new this.constructor(data));
                }
            }
        };


        /**
         * Get list of comments object
         * @param articleId {String} article id
         * @returns {promise|*|qFactory.Deferred.promise|fd.g.promise}
         */
        Comments.getList = function(articleId){
            var deferred = $q.defer();

            $timeout(function(){
                if (articleId === '777AAA') {
                    // create mocks Comment objects
                    var arr = [];
                    for (var i = 0; i < comments.length; i++) {
                        var data = comments[i];
                        arr.push(new Comments(data));
                    }

                    deferred.resolve(arr);
                } else {
                    deferred.reject('ERROR');
                }
            }, 400);

            return deferred.promise;
        };

        return Comments;
    }]);