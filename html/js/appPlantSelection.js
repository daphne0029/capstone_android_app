(function(appPlantSelectionFactory){
  appPlantSelectionFactory(myApp);

}(function(myApp){
  var data = myApp.data;
  var i;

  var plantView = function() {
    console.log("building plant view");
    var rowClass = "";
    var mark = "";
    var view = '<div id="plant" class="app_wrapper">';
    view += myApp.buildHeaderView('Plant Selection');
    view +=  `      <div class="plantselectiondescription">
            Select a plant type you want to grow.
          </div>`;
    view += '<div class="psd_planttable">';

    //Auto generate rows
    for(i = 0 ; i < data.plantsInfo.plantsArray.length ; i++){
      if (data.plantsInfo.plantsArray[i].commonName == myApp.data.selectedPlant.commonName){
        rowClass = "selectedrow";
        mark = "v";
      }else{
        rowClass = "";
        mark = "-";
      };
      view += `        <div class="myrow ${rowClass}">
                <div class="col SelectMark">
                  ${mark}
                </div>
                <div class="col psd_profile_pic">
                  <img class="small_profile_pic" src="${data.plantsInfo.plantsArray[i].profileImg}">
                </div>
                <div class="col psd_name">
                  ${data.plantsInfo.plantsArray[i].commonName}
                  <span class="arrayindex" style="display: none">${i}</span>
                  <div class="latinname">
                    ${data.plantsInfo.plantsArray[i].species}
                  </div>
                </div>
              </div>`;
    };

    view += '</div>';
    view += '</div>';
    //console.log(view);
    return view;
  };

  var plantEvents = function() {
    console.log('binding plant events');
    $('.header_menu').click(function(){
      myApp.goTo('home');
      console.log("going back to home page");
    });
    $('.myrow').click(function(){
      //Alert user that he/she is changing the setting
      var selectedindex = $('.arrayindex',this).text();
      var confirmMSG = `Gaia is currently growing : ${myApp.data.selectedPlant.commonName}
      Do you want to change the growing plant to ${data.plantsInfo.plantsArray[selectedindex].commonName}?` ;

      if (confirm(confirmMSG) == true){
        $('.myrow').not(this).removeClass('selectedrow');
        $(this).addClass('selectedrow');
        $('.SelectMark').not(this).text('-');
        $('.SelectMark',this).text('v');
        myApp.data.selectedPlant = data.plantsInfo.plantsArray[selectedindex];
      }else{
        "you press cancel";
      };


    });
  };

  myApp.control.plant.view.push(plantView);
  myApp.control.plant.events.push(plantEvents);

  return myApp;
}))
