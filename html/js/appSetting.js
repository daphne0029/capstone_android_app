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
            <input class="wateringimg" type="image" src="wateringcan.png" />
            <br>
            <p class="buttonLabel"> Press the image to water your plant! </p>
        </div>
     </div>`;

    view += '</div>';
    //console.log(view);
    return view;
  };

  var settingEvents = function() {
    console.log('binding setting events');
    $('.header_menu').click(function(){
      myApp.goTo('home');
      console.log("going back to home page");
    });
    $(".messageCheckbox","#manualButton").click(function(){
      console.log('user turning on manual mode');
      var manualMode = $(".messageCheckbox:checked","#manualButton").val();
      if(manualMode == 'on'){
        $(".messageCheckbox","#blueLight").removeAttr('disabled');
        $(".messageCheckbox","#redLight").removeAttr('disabled');
      }else{
        $(".messageCheckbox","#blueLight").attr('disabled','disabled');
        $(".messageCheckbox","#redLight").attr('disabled','disabled');
      }

    });

  };


  myApp.control.setting.view.push(settingView);
  myApp.control.setting.events.push(settingEvents);

  return myApp;
}))
