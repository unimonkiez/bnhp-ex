'use strict';

angular.module('myApp.filters', [])
    .filter('time', ['$filter', function() {
        var msPerMinute = 60 * 1000;
        var msPerHour = msPerMinute * 60;
        var msPerDay = msPerHour * 24;
        var msPerMonth = msPerDay * 30;
        var msPerYear = msPerDay * 365;

        return function(input) {
            var msDate = Date.parse(input);
            var date = new Date(msDate);
            var elapsed = Date.now() - msDate;

            if (elapsed < msPerMinute) {
                return 'A few seconds ago';
            } else if (elapsed < msPerHour) {
                return Math.round(elapsed / msPerMinute) + ' minute' + (elapsed < msPerMinute * 2 ? '' : 's') + ' ago';
            } else if (elapsed < msPerDay) {
                return Math.round(elapsed / msPerHour) + ' hour' + (elapsed < msPerHour * 2 ? '' : 's') + ' ago';
            } else if (elapsed < msPerMonth) {
                return Math.round(elapsed / msPerDay) + ' day' + (elapsed < msPerDay * 2 ? '' : 's') + ' ago';
            } else if (elapsed < msPerYear) {
                return Math.round(elapsed / msPerMonth) + ' month' + (elapsed < msPerMonth * 2 ? '' : 's') + ' ago';
            } else {
                return moment(msDate).format('[On] DD MMMM YYYY [at] HH:mm:ss');
            }
        };
    }]);
