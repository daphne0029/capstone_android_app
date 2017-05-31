(function(appDStatusFactory){
  appDStatusFactory(myApp);
}(function(myApp){
  var data = myApp.data;
  var  statusView = function() {
    var view = '<div id="status" class="app_wrapper">';
    view += myApp.buildHeaderView('Detailed Status');
    /* ADD your code-string here */





    view += '</div>';
    console.log(view);
    return view;
  };

  var statusEvents = function() {
    console.log('binding status events');
    $('.header_menu').click(function(){
      myApp.goTo('home');
      console.log("going back to home page");
    });

  };

  /*myApp.control.status.view.push(function(){
    var nickname = data.nickname;
    if (nickname) {
      var view = myApp.buildHeaderView(nickname);
    } else {
      var view = myApp.buildHeaderView('status');
    }
    view += '<div class="home"> status view</div>';
    return view;
  })*/

  myApp.control.status.view.push(statusView);
  myApp.control.status.events.push(statusEvents);








  return myApp;
}))
