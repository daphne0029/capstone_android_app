(function(appDStatusFactory){
  appDStatusFactory(myApp);
}(function(myApp){
  var data = myApp.data;

  myApp.control.status.view.push(function(){
    var nickname = data.nickname;
    if (nickname) {
      var view = myApp.buildHeaderView(nickname);
    } else {
      var view = myApp.buildHeaderView('status');
    }
    view += '<div class="home"> status view</div>';
    return view;
  })
  myApp.control.status.events.push(function(){
  });
  return myApp;
}))
