(function(appHomeFactory){
  appHomeFactory(myApp);

}(function(myApp){
  var data = myApp.data;
  var homeView = function() {
    var view = '<div id="home" class="app_wrapper">';
    view += myApp.buildHeaderView('Home');
    view += `
    <div class="profile">
      <div id="nickname" >
        Nickname:
        <input class="form-control" type="text" name="Nickname">
        <button id="enter" type="button" class="button1 btn btn-success">Enter</button>
      </div>
      <div class="species">Growing: Rose</div>
    </div>
    <div class="body">
      <div class="circle_title">
        <img class="profile_circle_img" src="profile_circle_large.png" alt="body_circle">
      </div>
      <div class="profile_pic">
        <img class="profile_img" src="rose1.jpg" alt="rose">
      </div>
      <div class="temperature"> 18&deg;C</div>
      <div class="air_humidity"> 45% </div>
      <div class="soil_humidity"> Wet </div>
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
    view += '<div class="home"> home view</div>';
    return view;
  };


  var homeEvents = function() {
    console.log('binding home events');

    $('.home_select_plant').click(function(){
      myApp.goTo('plant');
    });
    $('.home_detail_stats').click(function(){
      myApp.goTo('status');
    });
    $('#enter').click(function(){
      console.log('enter');
      var nickname = $('input[name="Nickname"]').val();
      console.log('nickname: ' + nickname);
      data.nickname = nickname;
    });
  };

  myApp.control.home.view.push(homeView);
  myApp.control.home.events.push(homeEvents);


  return myApp;
}))
