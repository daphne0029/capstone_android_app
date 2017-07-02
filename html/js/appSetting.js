(function(appSettingFactory){
  appSettingFactory(myApp);
}(function(myApp){
  var data = myApp.data;
  var settingView = function() {
    console.log("building setting view");
    var view = '<div id="setting" class="app_wrapper">';
    view += myApp.buildHeaderView('Setting');
    view += `<div class="main">

        <div id="manualButton" class="toggleSection">
            <label class="toggleLabel"> Manual Mode </label>

            <label class="switch toggleSide">
                <input class="messageCheckbox" type="checkbox">
                <div class="slider round"></div>
            </label>
        </div>

        <div id="blueLight" class="toggleSection">
            <label class="toggleLabel"> Blue Light </label>

            <label class="switch toggleSide">
                <input class="messageCheckbox" type="checkbox" disabled>
                <div class="slider round"></div>
            </label>
        </div>

        <div id="redLight" class="toggleSection">
            <label class="toggleLabel"> Red Light </label>

            <label class="switch toggleSide">
                <input class="messageCheckbox" type="checkbox" disabled="disabled">
                <div class="slider round"></div>
            </label>
        </div>
        <div class="toggleLabel toggleSection">
            <p><i>the watering button will have a 30 second delay time between waterings</i></p>
            <input class="wateringimg" type="image" src="wateringcan.png" disabled/>
            <br>
            <p class="buttonLabel"> Press the image to water your plant! </p>
        </div>
     </div>`;

    view += '</div>';
    //console.log(view);
    return view;
  };
  myApp.toggleManualMode = function(mode) {
    var d = {
      mode : mode
    };

    $.ajax({
        type: "get",
        url:   myApp.config.apiUrl,
        data: {'function' : 'toggleManualMode', 'data' : JSON.stringify(d)},
        dataType: 'json',
        success: function(response){
          if (response.status > 0) {

          } else {
            //handle error
          }
        }
    });
  }
  myApp.togglebluelight = function(lightB) {
    var d = {
      lightB : lightB
    };

    $.ajax({
        type: "get",
        url:   myApp.config.apiUrl,
        data: {'function' : 'togglebluelight', 'data' : JSON.stringify(d)},
        dataType: 'json',
        success: function(response){
          if (response.status > 0) {

          } else {
            //handle error
          }
        }
    });
  }
  myApp.toggleredlight = function(lightR) {
    var d = {
      lightR : lightR
    };

    $.ajax({
        type: "get",
        url:   myApp.config.apiUrl,
        data: {'function' : 'toggleredlight', 'data' : JSON.stringify(d)},
        dataType: 'json',
        success: function(response){
          if (response.status > 0) {

          } else {
            //handle error
          }
        }
    });
  }
  myApp.pumpwater = function(pump) {
    var d = {
      pump : pump
    };

    $.ajax({
        type: "get",
        url:   myApp.config.apiUrl,
        data: {'function' : 'pumpwater', 'data' : JSON.stringify(d)},
        dataType: 'json',
        success: function(response){
          if (response.status > 0) {

          } else {
            //handle error
          }
        }
    });
  }
  var settingEvents = function() {
    console.log('binding setting events');
    $('.header_menu').click(function(){
      myApp.goTo('home');
      console.log("going back to home page");
    });
    //$(".messageCheckbox","#manualButton").click(function(){
    $("#manualButton .messageCheckbox").click(function(){
      console.log('user turning on manual mode');
      var manualMode = $(".messageCheckbox","#manualButton").is(':checked');
      myApp.toggleManualMode(manualMode);

      if(manualMode){
        $(".messageCheckbox","#blueLight").removeAttr('disabled');
        $(".messageCheckbox","#redLight").removeAttr('disabled');
        $(".wateringimg").removeAttr('disabled');
      }else{
        $(".messageCheckbox","#blueLight").prop('checked',false);
        //lightB = $(".messageCheckbox","#blueLight").is(':checked');
        //myApp.togglebluelight(lightB);
        $(".messageCheckbox","#redLight").prop('checked',false);
        //lightR = $(".messageCheckbox","#redLight").is(':checked');
        //myApp.toggleredlight(lightR);
        $(".messageCheckbox","#blueLight").attr('disabled','disabled');
        $(".messageCheckbox","#redLight").attr('disabled','disabled');
        $(".wateringimg").attr('disabled','disabled');
        //myApp.pumpwater(false);
      }

    });
    $(".messageCheckbox","#blueLight").click(function(){
      var lightB = $(".messageCheckbox","#blueLight").is(':checked');
      console.log('user turning on blue light');
      myApp.togglebluelight(lightB);
    });
    $(".messageCheckbox","#redLight").click(function(){
      var lightR = $(".messageCheckbox","#redLight").is(':checked');
      console.log('user turning on red light');
      myApp.toggleredlight(lightR);
    });
    $(".wateringimg").click(function(){
      console.log('user wants to pump water');
      myApp.pumpwater(true);
    });
  };


  myApp.control.setting.view.push(settingView);
  myApp.control.setting.events.push(settingEvents);

  return myApp;
}))
