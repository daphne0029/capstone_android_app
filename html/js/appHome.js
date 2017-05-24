(function(appHomeFactory){
  appHomeFactory(myApp);

}(function(myApp){

  myApp.homeFunction1 = function() {
    console.log('homeFunction1');
  }
  myApp.homeBoot = function() {
    console.log('home boot');
  };

  return myApp;
}))
