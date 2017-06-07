(function(appHomeFactory){
  appHomeFactory(myApp);

}(function(myApp){
  var data = myApp.data;
  data.selectedPlant.commonName = "Lily";
  data.selectedPlant.profileImg = "lily2.jpg";
  data.backEndData.temperature = "17.5" + "&deg;C";
  data.backEndData.airHunidity = "35%";
  data.backEndData.soilHumidity = "Dry";

  var homeView = function() {
    var view = '<div id="home" class="app_wrapper">';
    view += myApp.buildHeaderView('Home');
    view += `
    <div class="profile">
      <div id="nickname" >
        Nickname:
        <span id="nicknametext"></span>
        <input class="form-control" type="text" name="Nickname">
        <button id="enter" type="button" class="button1 btn btn-success" style="outline: none;">Enter</button>
      </div>
      <div class="species">Growing: ${data.selectedPlant.commonName}</div>
    </div>
    <div class="body">
      <div class="circle_title">
        <img class="profile_circle_img" src="profile_circle_large.png" alt="body_circle">
      </div>
      <div class="profile_pic">
        <img class="profile_img" src="${data.selectedPlant.profileImg}" alt="rose">
      </div>
      <div class="temperature"> ${data.backEndData.temperature}</div>
      <div class="air_humidity"> ${data.backEndData.airHunidity} </div>
      <div class="soil_humidity"> ${data.backEndData.soilHumidity} </div>
    </div>
    <div class="footer">
      <div>
        <div class="menu home_select_plant">
          <i class="menu_button fa fa-pagelines" aria-hidden="true"></i>
          <p class="menu_titles"> Select a Plant </p>
        </div>
        <div class="menu home_detail_stats">
          <i class="menu_button fa fa-newspaper-o" aria-hidden="true"></i>
          <p class="menu_titles"> Detail Stats </p>
        </div>
        <div class="menu home_settings">
          <i class="menu_button fa fa-cog" aria-hidden="true"></i>
          <p class="menu_titles"> Settings </p>
        </div>
      </div>
    </div>
    </div>
    `;
    //view += '<div class="home"> home view</div>';
    return view;
  };


  var homeEvents = function() {
    console.log('binding home events');

    $('.home_select_plant').click(function(){
      myApp.goTo('plant');
      console.log("going to plant selection page");
    });
    $('.home_detail_stats').click(function(){
      myApp.goTo('status');
      console.log("going to detail status page");
    });
    $('.home_settings').click(function(){
      myApp.goTo('setting');
      console.log("going to setting page");
    });

    $('#enter').click(function(){
      console.log('user pressed enter');
      var nickname = $('input[name="Nickname"]').val();
      console.log('nickname: ' + nickname);
      data.nickname = nickname;
      if (nickname.length > 0){
        $('input[name="Nickname"]').hide();
        $('.button1').hide();
        $('#nicknametext').append(nickname);
      }
    });
    $('#nicknametext').click(function(){
      console.log('changing nickname');
      $('#nicknametext').empty();
      $('input[name="Nickname"]').show();
      $('.button1').show();
    });

  };

  myApp.control.home.view.push(homeView);
  myApp.control.home.events.push(homeEvents);


  return myApp;
}))
