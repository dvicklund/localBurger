$(document).ready(function () {
  console.log("ready!");
  $("#logo").click(function(){switchContent("#landingContent")});
  $("#contactNav").click(function(){switchContent("#contactContent")});
  $("#menuNav").click(function(){switchContent("#menuContent")});
  $("#reserveNav").click(function(){switchContent("#reservationContent")});
  $("#eventNav").click(function(){switchContent("#eventContent")});
});

function switchContent(contentId) {
  $("#landingContent").hide();
  $("#contactContent").hide();
  $("#menuContent").hide();
  $("#reservationContent").hide();
  $("#eventContent").hide();

  if (arguments.length > 0) {
    $(contentId).show();
  };
};
