(function(myAppFactory){
  window.myApp = myAppFactory({});

}(function(myApp){
  var config = {
    appContainerId : "default_app_container"
  };
  var data = {
    nickname : '',
    backEndData : {},
    backEndDataString : '',
  };
  var control = {
    home : {
      view : [], //array of functions
      events : []
    },
    setting :  {
      view : [],
      events : []
    },
    status :  {
      view : [],
      events : []
    },
    plant :  {
      view : [],
      events : []
    },
  };
  myApp.control = control;
  myApp.data = data;

  myApp.init = function() {
    myApp.goTo('home');
  };
  myApp.goTo = function(page) {
    //$('.app_wrapper').hide();
    //$('#'+page).fadeIn();

    $('#'+config.appContainerId).empty();
    //call page function
    var view = '';
    control[page].view.forEach((func,index)=>{
      view += func();
    })
    $('#'+config.appContainerId).html(view);

    //bind events
    control[page].events.forEach((func,index)=>{
      func();
    });
  };
/*
  myApp.helloworld = function() {
    alert('hello world');
  };
  */
  myApp.loadConfig = function(cfg) {
    console.log('loading config');
    config = $.extend( config, cfg );
  }
  myApp.buildHeaderView = function(title){
    var view = `
            <div class="header">
                <div class="header_menu"><</div>
                <h1 style="font-family: Comic Sans, cursive, sans-serif;">${title}</h1>
            </div>
    `;
    return view;
  }
  /*
  myApp.buildView = function() {

    $('#'+config.appContainerId).empty();
    var view = '';

    view += '<div class="body_view">';
    view += myApp.buildViewHome();
    view += '<div class="status"> status view</div>';
    view += '<div class="plant"> plants view</div>';
    view += '<div class="setting"> settings view</div>';
    view += '</div>';

    view += '<div class="menu">';
    view += '<div class="home"> home</div>';
    view += '<div class="status"> status</div>';
    view += '<div class="plant"> plants</div>';
    view += '<div class="setting"> settings</div>';
    view += '</div>';

    view += '<div id="home" class="app_wrapper">';
    view += myApp.buildViewHome();
    view += '</div>';

    view += '<div id="status" class="app_wrapper">';
    view += myApp.buildViewStatus();
    view += '</div>';

    view += '<div id="plant" class="app_wrapper">';
    view += myApp.buildViewPlant();
    view += '</div>';

    view += '<div id="setting" class="app_wrapper">';
    view += myApp.buildViewSetting();
    view += '</div>';

    $('#'+config.appContainerId).html(view);

  };

  */
  //binding menu events
  /*
  myApp.bindEvents = function() {
    myApp.bindEventsHome();
    myApp.bindEventsStatus();
    myApp.bindEventsPlant();
    myApp.bindEventsSetting();
    */
    /*
    $('#homepage').click(()=>{
      myApp.displayHomePage();
    });
    */
    //$('#default_app_container .test')
    /*
    $('#'+config.appContainerId+' .test').each(function(){
      $(this).click(function(){
        alert('hello world');
      });
    });
    $('#'+config.appContainerId+' .menu div').each(function(){
      $(this).click(function(){
        var className = $(this).attr('class');
        $('#'+config.appContainerId+' .body_view div').hide();
        $('#'+config.appContainerId+' .body_view div.'+className).fadeIn();
      });
    });

  }
*/

  myApp.boot = function(cfg) {
    myApp.loadConfig(cfg);
    console.log('booting...');

    //$('#'+config.appContainerId).html('<h1>Welcome</h1>');

    //build view ( all 4 views )
    //console.log('building UI...');
    //myApp.buildView();

    //event bindings
    //console.log('Binding events...');
    //myApp.bindEvents();

    console.log('initializing ... ');
    myApp.init();
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
