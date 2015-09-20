$(document).ready(function () {
  console.log("ready!");
  $("#logo").click(function(){switchContent("#landingContent")});
  $("#contactNav").click(function(){switchContent("#contactContent")});
  $("#menuNav").click(function(){switchContent("#menuContent")});
  $("#reserveNav").click(function(){switchContent("#reservationContent")});
  $("#eventNav").click(function(){switchContent("#eventContent")});
  $("#brunchNav").click(function() {switchContent("brunchMenuContent")});
  $("#cateringNav").click(function() {switchContent("cateringMenuContent")});
  $("#dayNav").click(function() {switchContent("dayMenuContent")});
  $("#happyHourNav").click(function() {switchContent("happyHourMenuContent")});
});

function switchContent(contentId) {
  $("#landingContent").hide();
  $("#contactContent").hide();
  $("#menuContent").hide();
  $("#reservationContent").hide();
  $("#eventContent").hide();
  $("#brunchMenuContent").hide();
  $("#cateringMenuContent").hide();
  $("#dayMenuContent").hide();
  $("#happyHourMenuContent").hide();

  if (arguments.length > 0) {
    $(contentId).show();
  };
};
