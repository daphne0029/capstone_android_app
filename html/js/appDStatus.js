(function(appDStatusFactory){
  appDStatusFactory(myApp);
}(function(myApp){
  var data = myApp.data;
  var  statusView = function() {
    var view = '<div id="status" class="app_wrapper">';
    view += myApp.buildHeaderView('Detailed Status');
    /* ADD your code-string here */
    view += `<div class="main">

            <div class="image">
                <img src="SIP943899.jpg.rendition.largest.jpg" style="width:360px;height:480px;">
            </div>
        <div class="profileDetails">
            <ul class="listAppearance">
                <li> Gerome Leeman </li>
                <li> <i> Leucanthemum vulgaree </i> </li>
                <li> Auto Mode </li>
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
                    <td> 30&deg;C </td>
                </tr>

                <tr>
                    <th class="rowheader"> Humidity: </th>
                    <td> Air: </td>
                    <td> 30% </td>
                </tr>
                <tr>
                    <td>   </td>
                    <td> Soil: </td>
                    <td> 20% </td>
                </tr>
                <tr>
                    <th class="rowheader"> Last Time Watered: </th>
                    <td> 05/01/17 1:01 pm </td>
                </tr>
                <tr>
                    <th class="rowheader"> Light: </th>
                    <td> White: </td>
                    <td> Medium </td>
                </tr>
                <tr>
                    <th>   </th>
                    <td> Red: </td>
                    <td> OFF </td>
                </tr>
                <tr>
                    <th>   </th>
                    <td> Blue: </td>
                    <td> OFF </td>
                </tr>
            </table>
        </div>
    </div>`;




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
