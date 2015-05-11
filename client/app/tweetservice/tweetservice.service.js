'use strict';

angular.module('twittexpressApp')
.service('tweetservice', function ($http,$interval) {

    var time;
    var age;
    var ts;

      var called = 0;
      $interval(function () {
          called++;
          console.log('called',called);
      }, 1000);



     var prueba = function(callback){

        $interval(function(){
            searchData('algo')
              .then(
                function(response){

                  callback(response.data);
                });

        }, 1000);
    }

    var searchData = function(query, since) {
        var data = {query: query};

        var queryUrl = '/search';
        var promise = $http.post(queryUrl, data)
            .then(function (response) {
            return response;
        });
        console.log('un mensaje');
        return promise;
    }


    return {

        getCalled : function () {
            return called;
        },

        init:function(options){
            if(options.time && options.age){
                time = options.time;
                age = options.age;
                return true
            }else{
                return false;
            }

        },

        consult:function(callback){
            $interval(function(){
                searchData('algo')
                .then(
                    function(response){
                    callback(response.data);
                    });
                }, 1000);
        /*consult:searchData*/
        },

        asyncSearch: searchData
    };
});
