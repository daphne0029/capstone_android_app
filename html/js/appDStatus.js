(function(appDStatusFactory){
  appDStatusFactory(myApp);
}(function(myApp){
  var data = myApp.data;
  var  statusView = function() {
    var LightR = "off";
    var LightB = "off";
    var mode = "Unknown"
    if (data.backEndData.status.LightR) {
      LightR = "on";
    }else{
      LightR = "off";
    };
    if (data.backEndData.status.LightB) {
      LightB = "on";
    }else{
      LightB = "off";
    };
    if(data.backEndData.manualmode) {
      mode = "Manual Mode";
    }else{
      mode = "Auto Mode";
    }

    var view = '<div id="status" class="app_wrapper">';
    view += myApp.buildHeaderView('Detailed Status');
    /* ADD your code-string here */
    view += `<div class="main">

            <div class="image">
                <img src="${data.selectedPlant.profileImg}" style="width:360px;height:480px;">
            </div>
        <div class="profileDetails">
            <ul class="listAppearance">
                <li> ${data.selectedPlant.commonName} </li>
                <li> <i> ${data.plantsInfo.plantsArray[data.selectedPlant.selectedid].species} </i> </li>
                <li> ${mode} </li>
            </ul>
        </div>
        <div class="waterLevel styleFont">
            <h2> Water Tank Level is good </h2>
        </div>
        <div>
        <br>
            <table class="tableEntry styleFont">
                <tr>
                    <th class="rowheader"> Temperature: </th>
                    <td> ${data.backEndData.temperature} </td>
                </tr>

                <tr>
                    <th class="rowheader"> Humidity: </th>
                    <td> Air: </td>
                    <td> ${data.backEndData.airHumidity} </td>
                </tr>
                <tr>
                    <td>   </td>
                    <td> Soil: </td>
                    <td> ${data.backEndData.soilHumidity} </td>
                </tr>
                <tr>
                    <th class="rowheader"> Last Time Watered: </th>
                    <td> ${data.backEndData.lastTimeWater} </td>
                </tr>
                <tr>
                    <th class="rowheader"> Light: </th>
                    <td> White: </td>
                    <td> ${data.backEndData.status.LightW} </td>
                </tr>
                <tr>
                    <th>   </th>
                    <td> Red: </td>
                    <td> ${LightR} </td>
                </tr>
                <tr>
                    <th>   </th>
                    <td> Blue: </td>
                    <td> ${LightB} </td>
                </tr>
            </table>
        </div>
    </div>`;




    view += '</div>';
    //console.log(view);
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
