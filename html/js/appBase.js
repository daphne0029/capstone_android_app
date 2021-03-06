(function(myAppFactory){
  window.myApp = myAppFactory({});

}(function(myApp){
  var config = {
    appContainerId : "default_app_container",
    apiUrl : "http://capstone.local/ajax/data.php",
    updatePeriod : 3000,
  };


  var data = {
    currentPage : 'home',
    nickname : '',
    plantsInfo : {
      plantsArray : []
    },
    backEndData : {
      temperature : "00.0&deg;C",
      airHumidity : "00%",
      soilHumidity : "00%",
      lastTimeWater : "yyyy-mm-dd 24HH:MI:SS",
      waterTankLevel : {
        below50 : false,
        below20 : false,
        empty : false
      },
      manualmode : false,
      lastConfirm : "",
      status : {}
    },
    backEndDataString : '',
    selectedPlant : {
      commonName : "No plant is selected",
      selectedid : 0,
      profileImg : "assets/questionmark.jpg",
    },
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
    myApp.goTo(data.currentPage);
  };
  myApp.goTo = function(page) {
    //$('.app_wrapper').hide();
    //$('#'+page).fadeIn();
    data.currentPage = page;
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
                <div class="header_menu">
                  <i class="header_icon fa fa-chevron-left" aria-hidden="true"></i>
                </div>
                <h1>${title}</h1>
            </div>
    `;
    return view;
  };

  myApp.getData = function(callback) {
    $.ajax({
  	    type: "get",
  	    url: myApp.config.apiUrl,
  	    data: {'function' : 'initialLoad'},
  	    dataType: 'json',
  	    success: function(response){
          if (response.status > 0) {
            data.plantsInfo = response.data.plantSpecs;
            if (typeof(callback) == 'function'){
              callback();
            }
          } else {
            //handle error
          }
  	    }
  	});
  };
  myApp.requestreport = function(callback) {
    $.ajax({
        type: "get",
        url:   myApp.config.apiUrl,
        data: {'function' : 'requestreport'},
        dataType: 'json',
        success: function(response){
          if (response.status > 0) {
            data.selectedPlant.commonName = response.data.appdata.selectedplant;
            data.backEndData.temperature = response.data.report.reading.temperature + "&deg;C";
            data.backEndData.airHumidity = response.data.report.reading.airHumidity + "%";
            data.backEndData.soilHumidity = response.data.report.reading.soilHumidity + "%";
            data.backEndData.lastTimeWater = response.data.appdata.lastTimeWater;
            data.backEndData.status = response.data.report.status;
            //console.log("******(database)red led = " + response.data.report.status.LightR);
            data.backEndData.manualmode = response.data.appdata.manualmode;
            data.backEndData.lastConfirm = response.data.keydata.confirmTS;
            data.backEndData.waterTankLevel = response.data.report.waterTankLevel;
            data.selectedPlant.selectedid = response.data.appdata.selectedid;
            data.selectedPlant.profileImg = data.plantsInfo.plantsArray[data.selectedPlant.selectedid].profileImg;
            if (typeof(callback) == 'function'){
              callback();
            }
          } else {
            //handle error
          }
        }
    });
  };

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
    myApp.getData(function(){
      myApp.requestreport(function(){
        myApp.init();
      });
      //start periodic update on data
      setInterval(()=>{
        myApp.requestreport(()=>{
          console.log('request report callback');
          var newDataString = JSON.stringify(data.selectedPlant) + JSON.stringify(data.backEndData);
          if (newDataString !== data.backEndDataString) {
            data.backEndDataString = newDataString;
            console.log('rebuilding '+data.currentPage);
            myApp.goTo(data.currentPage);
          }
        });
      },config.updatePeriod)
    });


  }



  myApp.config = config;
  return myApp;
}))
