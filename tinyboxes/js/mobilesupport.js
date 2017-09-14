var flag = false;

var supportTouch = $.support.touch,
            scrollEvent = "touchmove scroll",
            touchStartEvent = supportTouch ? "touchstart" : "mousedown",
            touchStopEvent = supportTouch ? "touchend" : "mouseup",
            touchMoveEvent = supportTouch ? "touchmove" : "mousemove";
    $.event.special.swipeupdown = {
        setup: function() {
            var thisObject = this;
            var $this = $(thisObject);
            $this.bind(touchStartEvent, function(event) {
                var data = event.originalEvent.touches ?
                        event.originalEvent.touches[ 0 ] :
                        event,
                        start = {
                            time: (new Date).getTime(),
                            coords: [ data.pageX, data.pageY ],
                            origin: $(event.target)
                        },
                        stop;

                function moveHandler(event) {
                    if (!start) {
                        return;
                    }
                    var data = event.originalEvent.touches ?
                            event.originalEvent.touches[ 0 ] :
                            event;
                    stop = {
                        time: (new Date).getTime(),
                        coords: [ data.pageX, data.pageY ]
                    };

                    // prevent scrolling
                    if (Math.abs(start.coords[1] - stop.coords[1]) > 10) {
                        event.preventDefault();
                    }
                }
                $this
                        .bind(touchMoveEvent, moveHandler)
                        .one(touchStopEvent, function(event) {
                    $this.unbind(touchMoveEvent, moveHandler);
                    if (start && stop) {
                        if (stop.time - start.time < 1000 &&
                                Math.abs(start.coords[1] - stop.coords[1]) > 30 &&
                                Math.abs(start.coords[0] - stop.coords[0]) < 75) {
                            start.origin
                                    .trigger("swipeupdown")
                                    .trigger(start.coords[1] > stop.coords[1] ? "swipeup" : "swipedown");
                        }
                    }
                    start = stop = undefined;
                });
            });
        }
    };
    $.each({
        swipedown: "swipeupdown",
        swipeup: "swipeupdown"
    }, function(event, sourceEvent){
        $.event.special[event] = {
            setup: function(){
                $(this).bind(sourceEvent, $.noop);
            }
        };
    });

//swipeUp
$('body').on("swipeup", function() {
    if (!didLose && !didWin) {
        var currentX = currentCube.x;
        var currentY = currentCube.y;
        lastDirection = directionEnum.UP;
        ChangeToNextCube(currentY - 1, currentX);
    }
    addHandleForEnter();
});

//swipeDown
$('body').on("swipedown", function() {

    if (!didLose && !didWin) {
        var currentX = currentCube.x;
        var currentY = currentCube.y;
        lastDirection = directionEnum.BOTTOM;
        ChangeToNextCube(currentY + 1, currentX);
    }
    addHandleForEnter();
});

//swipeLeft
$('body').on("swipeleft", function() {

    if (!didLose && !didWin) {
        var currentX = currentCube.x;
        var currentY = currentCube.y;
        lastDirection = directionEnum.LEFT;
        ChangeToNextCube(currentY, currentX - 1);
    }
    addHandleForEnter();
});

$('body').on("swiperight", function() {
    if (!didLose && !didWin) {
        var currentX = currentCube.x;
        var currentY = currentCube.y;
        lastDirection = directionEnum.RIGHT;
        ChangeToNextCube(currentY, currentX + 1);
    }
    addHandleForEnter();
});

function addHandleForEnter(){
  if(!flag){
  $('.enter-btn').on("tap", function() {
      if (!didLose && !didWin) {
          if (!didStart) {
              startPlayMode();
              isFirstKey = false;
              $("#tut01").fadeOut(function() {
                  $("#tut02").fadeOut(function() {
                      $("#tut03").fadeIn();
                  });
              });
              ChangeToNextCube(currentY, currentX);
          }
      }
  });
  }
}



var tut01="";
tut01 += "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>";
tut01 += "                <svg width=\"97px\" height=\"65px\" viewBox=\"0 0 97 65\" version=\"1.1\" xmlns=\"http:\/\/www.w3.org\/2000\/svg\" xmlns:xlink=\"http:\/\/www.w3.org\/1999\/xlink\">";
tut01 += "                    <title>Group 2<\/title>";
tut01 += "                    <desc>Created with Sketch.<\/desc>";
tut01 += "                    <defs>";
tut01 += "                        <linearGradient x1=\"-12.4471978%\" y1=\"0%\" x2=\"177.511168%\" y2=\"0%\" id=\"linearGradient-1\">";
tut01 += "                            <stop stop-color=\"#000000\" stop-opacity=\"0\" offset=\"0%\"><\/stop>";
tut01 += "                            <stop stop-color=\"#000000\" stop-opacity=\"0.996033287\" offset=\"100%\"><\/stop>";
tut01 += "                            <stop stop-color=\"#FFFFFF\" offset=\"100%\"><\/stop>";
tut01 += "                        <\/linearGradient>";
tut01 += "                    <\/defs>";
tut01 += "                    <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">";
tut01 += "                        <g id=\"Artboard\" transform=\"translate(-112.000000, -486.000000)\">";
tut01 += "                            <g id=\"Group\" transform=\"translate(112.000000, 488.000000)\">";
tut01 += "                                <g id=\"Group-2\">";
tut01 += "                                    <path d=\"M0,13 C0,11.8954305 0.889892578,10.9258423 1.98679537,10.8344337 L34.0132046,8.16556628 C35.1104814,8.07412655 36,8.88743329 36,9.99961498 L36,16.000385 C36,17.1047419 35.1101074,17.9258423 34.0132046,17.8344337 L1.98679537,15.1655663 C0.889518584,15.0741265 0,14.1122704 0,13 L0,13 Z\" id=\"Rectangle\" fill=\"url(#linearGradient-1)\" opacity=\"0.527460354\"><\/path>";
tut01 += "                                    <path d=\"M61.6271507,31.4141644 L57.9721644,25.1470411 C56.7964521,23.1883562 57.3187123,20.5770548 59.1470411,19.4021781 C60.9745342,18.2264658 63.4554795,18.8799178 64.6303562,20.9689589 L68.6780822,27.8886986\" id=\"Stroke-2\" stroke=\"#000000\" stroke-width=\"3.125\"><\/path>";
tut01 += "                                    <path d=\"M68.6780822,27.8886986 L65.8052329,22.9276438 C64.6303562,20.9689589 65.1526164,18.3576575 66.9809452,17.1819452 C68.8084384,16.0070685 71.2893836,16.6605205 72.4642603,18.7495616 L75.5978219,24.1025205\" id=\"Stroke-3\" stroke=\"#000000\" stroke-width=\"3.125\"><\/path>";
tut01 += "                                    <path d=\"M62.2806027,32.5890411 L51.051589,13.265411 C49.8767123,11.306726 47.3957671,10.6541096 45.4379178,11.8289863 C43.4792329,13.003863 42.8257808,15.7463562 44.0014932,17.7050411 L60.452274,45.9070959 L49.8767123,43.5565068 C49.8767123,43.5565068 45.0460137,43.686863 44.6541096,47.996137 C44.2622055,52.3045753 53.5325342,51.9126712 53.5325342,51.9126712 C53.5325342,51.9126712 62.5413151,52.8268356 68.547726,58.7020548 C74.5533014,64.577274 84.7377945,55.3077808 84.7377945,55.3077808 C84.7377945,55.3077808 89.8292055,52.5652877 92.5716986,50.7377945 C95.3133562,48.9094658 95.3133562,42.3816301 91.6575342,35.9833151 L81.0819726,17.9657534 C79.9070959,16.0070685 77.4261507,15.2240959 75.5978219,16.3989726 C73.7703288,17.5738493 73.2480685,20.1851507 74.4229452,22.1438356 L77.0342466,26.452274\" id=\"Stroke-1\" stroke=\"#000000\" stroke-width=\"3.125\"><\/path>";
tut01 += "                                    <path d=\"M47.6573151,23.9721644 C47.1350548,24.1025205 46.4824384,24.1025205 45.9593425,24.1025205 C39.6922192,24.1025205 34.4696164,18.7495616 34.4696164,12.2208904 C34.4696164,5.69221918 39.561863,0.469616438 45.9593425,0.469616438 C52.3576575,0.469616438 57.4490685,5.82341096 57.4490685,12.3512466 C57.4490685,14.8321918 56.6660959,17.313137 55.3600274,19.1406301\" id=\"Stroke-4\" stroke=\"#000000\" stroke-width=\"3.125\"><\/path>";
tut01 += "                                <\/g>";
tut01 += "                            <\/g>";
tut01 += "                        <\/g>";
tut01 += "                    <\/g>";
tut01 += "                <\/svg>";
tut01 += "                <p class=\"description\">your goal is to mark all squares green.<br> swipe to choose a starting point<\/p>";

var tut02="";
tut02 += "<div class=\"enter-btn\"><p>Start<p><\/div>";
tut02 += "                <p class=\"description\">Start once you think you're in the right spot. after that, repeating yourself is not allowed.<\/p>";


function detectmob() {
  return (typeof window.orientation !== 'undefined');
}

if(detectmob()){
  $("#tut01").html(tut01);
  $("#tut02").html(tut02);
  $(".desktop-overlay").fadeIn();
}

function hideDesktopPopup(){
  $(".desktop-overlay").fadeOut();
}
