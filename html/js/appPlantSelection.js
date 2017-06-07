(function(appPlantSelectionFactory){
  appPlantSelectionFactory(myApp);

}(function(myApp){
  var data = myApp.data;
  var i;
  var testdata = {
    name : [],
    latinname : [],
    imgSrc : [],
  };

  testdata.name = ['Rose','Lily','asfsd','aaaaa'];
  testdata.latinname = ['Rosa rubiginosa','Lilium candidum','wwwwwwwww','bbbbb'];
  testdata.imgSrc = ['rose1.jpg','lily2.jpg','lily2.jpg','lily2.jpg'];

  var plantView = function() {
    console.log("building plant view");
    var view = '<div id="plant" class="app_wrapper">';
    view += myApp.buildHeaderView('Plant Selection');
    view +=  `      <div class="plantselectiondescription">
            Select a plant type you want to grow.
          </div>`;
    view += '<div class="psd_planttable">';

    //Auto generate rows
    for(i = 0 ; i < testdata.name.length ; i++){
      console.log("name[" + i + "] = " + testdata.name[i]);
      view += `        <div class="myrow">
                <div class="col SelectMark">
                  -
                </div>
                <div class="col psd_profile_pic">
                  <img class="small_profile_pic" src="${testdata.imgSrc[i]}" alt="rose">
                </div>
                <div class="col psd_name">
                  ${testdata.name[i]}
                  <div class="latinname">
                    ${testdata.latinname[i]}
                  </div>
                </div>
              </div>`;
    };

    view += '</div>';
    view += '</div>';
    console.log(view);
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
    });
  };

  myApp.control.plant.view.push(plantView);
  myApp.control.plant.events.push(plantEvents);

  return myApp;
}))
