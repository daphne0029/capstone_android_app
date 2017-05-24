(function(myAppFactory){
  window.myApp = myAppFactory({});

}(function(myApp){
  var config = {
    appContainerId : "default_app_container"
  };


  myApp.helloworld = function() {
    alert('hello world');
  };
  myApp.boot = function(cfg) {
    config = $.extend( config, cfg );
    console.log('booting...');

    $('#'+config.appContainerId).html('<h1>Welcome</h1>');
/*
    var name = 'lonelymonkey';
    var num = 10;
    var view = ' hello <strong>'  + name + '</strong> \
                <div>chickenbone boy '+ num +'</div>                                      \
                ';
    $('#'+config.appContainerId).html(view);

    */
  }



  myApp.config = config;
  return myApp;
}))
