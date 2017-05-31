(function(appSettingFactory){
  appSettingFactory(myApp);
}(function(myApp){
  var data = myApp.data;
  var settingView = function() {
    console.log("building setting view");
    var view = '<div id="setting" class="app_wrapper">';
    view += myApp.buildHeaderView('Setting');
    //view += ``;

    view += '</div>';
    console.log(view);
    return view;
  };

  var settingEvents = function() {
    console.log('binding setting events');
    $('.header_menu').click(function(){
      myApp.goTo('home');
      console.log("going back to home page");
    });

  };


  myApp.control.setting.view.push(settingView);
  myApp.control.setting.events.push(settingEvents);

  return myApp;
}))
