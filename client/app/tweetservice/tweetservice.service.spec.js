'use strict';

describe('Service: tweetservice', function () {

  // load the service's module
  beforeEach(module('twittexpressApp'));

  // instantiate service
  var tweetservice,
  $httpBackend,
  options,
  $interval;

  beforeEach(inject(function (_tweetservice_, _$httpBackend_,$injector) {

    tweetservice = _tweetservice_;
    $httpBackend = _$httpBackend_;
    $interval = $injector.get('$interval');


    options = {
        'time':1000,
        'age':1
    }

  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingRequest();
    $httpBackend.verifyNoOutstandingExpectation();
  });


  it('verify entry initial doptions ',function(){
    var options = {
        'time':1000,
        'age':1
    }
    var result = tweetservice.init(options);
    expect(result).toBe(true);
  });





  it('calls the interval callback', function () {


    $httpBackend.expectPOST('/search')
      .respond(200, []);

      var ts;
      tweetservice.consult(function(result){
        console.log('valor de ts test:',result);
        ts=result;


        //$interval.flush(1000);
        /*$httpBackend.flush(1000);
        expect(ts.length).toBe(0);*/

        /*

        $httpBackend.flush();
        expect(ts.length).toBe(0);

        $interval.flush(1000);
        $httpBackend.flush();
        expect(ts.length).toBe(0);*/

      });

  });


/*
  it('should make a request based on the initial options',function(){


    console.log('interval',$interval);

  //  $httpBackend.expectPOST('/search')
    //  .respond(200, []);

    /*$interval(function(){
      console.log('valoor');
    },3000);*/



//$httpBackend.flush();

    //$interval.flush();
/*
    setInterval(function(){
    $httpBackend.expectPOST('/search')
      .respond(200, []);
    var ts;
      tweetservice.consult('algo')
      .then(
        function(response){
          ts = response.data;
        });
      $httpBackend.flush();
      expect(ts.length).toBe(0);
    },2000);
*/
  //});



  /*
   * This service should poll the server each n time to check
   * if it has new twitts for today
   * */

  it('should poll a server', function () {

    $httpBackend.expectPOST('/search')
      .respond(200, []);

    var ts;
    tweetservice.asyncSearch('algo')
    .then(
      function(response){
        ts = response.data;
      });

    $httpBackend.flush();
    expect(ts.length).toBe(0);
  });

});
