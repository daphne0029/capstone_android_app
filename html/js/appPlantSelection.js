(function(appPlantSelectionFactory){
  appPlantSelectionFactory(myApp);

}(function(myApp){
  var data = myApp.data;
  var i;

  //console.log("HELLO");
/*
    var testdata = {
    name : [],
    latinname : [],
    imgSrc : [],
  };

  testdata.name = ['Rose','Lily','asfsd','aaaaa'];
  testdata.latinname = ['Rosa rubiginosa','Lilium candidum','wwwwwwwww','bbbbb'];
  testdata.imgSrc = ['rose1.jpg','lily2.jpg','lily2.jpg','lily2.jpg'];
*/

  var plantView = function() {
    console.log(data.plantsInfo.plantsArray[0].commonName);
    console.log("building plant view");
    var view = '<div id="plant" class="app_wrapper">';
    view += myApp.buildHeaderView('Plant Selection');
    view +=  `      <div class="plantselectiondescription">
            Select a plant type you want to grow.
          </div>`;
    view += '<div class="psd_planttable">';

    //Auto generate rows
    for(i = 0 ; i < data.plantsInfo.plantsArray.length ; i++){
      //console.log("name[" + i + "] = " + testdata.name[i]);
      view += `        <div class="myrow">
                <div class="col SelectMark">
                  -
                </div>
                <div class="col psd_profile_pic">
                  <img class="small_profile_pic" src="${data.plantsInfo.plantsArray[i].profileImg}">
                </div>
                <div class="col psd_name">
                  ${data.plantsInfo.plantsArray[i].commonName}
                  <span class="arrayindex" style="visibility:hidden">${i}</span>
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
      $('.myrow').not(this).removeClass('selectedrow');
      $(this).addClass('selectedrow');
      $('.SelectMark').not(this).text('-');
      $('.SelectMark',this).text('v');
      var selectedindex = $('.arrayindex',this).text();
      myApp.data.selectedPlant = data.plantsInfo.plantsArray[selectedindex];
      console.log("picked plant = " + myApp.data.selectedPlant.commonName);
      /*var pickedPlant = $('.latinname',this).text();
      pickedPlant = pickedPlant.replace(/\n/,"").replace(/ /g,"_").replace(/__+/g,"").replace(/\W+$/g,"");
      pickedPlant = pickedPlant.replace(/_/," ");
      console.log("picked plant = " + pickedPlant + ",length = " + pickedPlant.length);*/
    //  console.log("picked plant = " + this);
    });
  };

  myApp.control.plant.view.push(plantView);
  myApp.control.plant.events.push(plantEvents);

  return myApp;
}))
