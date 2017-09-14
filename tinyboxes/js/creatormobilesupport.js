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
                event.originalEvent.touches[0] :
                event,
                start = {
                    time: (new Date).getTime(),
                    coords: [data.pageX, data.pageY],
                    origin: $(event.target)
                },
                stop;

            function moveHandler(event) {
                if (!start) {
                    return;
                }
                var data = event.originalEvent.touches ?
                    event.originalEvent.touches[0] :
                    event;
                stop = {
                    time: (new Date).getTime(),
                    coords: [data.pageX, data.pageY]
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
}, function(event, sourceEvent) {
    $.event.special[event] = {
        setup: function() {
            $(this).bind(sourceEvent, $.noop);
        }
    };
});

//swipeUp
$('body').on("swipeup", function() {
    if (!didEnd) {
        var currentX = currentCube.x;
        var currentY = currentCube.y;
        ChangeToNextCube(currentY - 1, currentX);
        if (didStart) {
            lastDirection = directionEnum.UP;
        }
    }
});

//swipeDown
$('body').on("swipedown", function() {

    if (!didEnd) {
        var currentX = currentCube.x;
        var currentY = currentCube.y;
        ChangeToNextCube(currentY + 1, currentX);
        if (didStart) {
            lastDirection = directionEnum.BOTTOM;
        }
    }
});

//swipeLeft
$('body').on("swipeleft", function() {

    if (!didEnd) {
        var currentX = currentCube.x;
        var currentY = currentCube.y;
        ChangeToNextCube(currentY, currentX - 1);
        if (didStart) {
            lastDirection = directionEnum.LEFT;
        }
    }
});

$('body').on("swiperight", function() {
    if (!didEnd) {
        var currentX = currentCube.x;
        var currentY = currentCube.y;
        ChangeToNextCube(currentY, currentX + 1);
        if (didStart) {
            lastDirection = directionEnum.RIGHT;
        }
    }
});

function addHandleForEnter() {
    $('.enter-btn').on("tap", function() {
        if (!didStart) {
            var currentX = currentCube.x;
            var currentY = currentCube.y;
            console.log("currentX: " +currentX +", currentY: " +currentY);
            startPaintMode();
            isFirstKey = false;
            ChangeToNextCube(currentY, currentX);
        }
        //enter again
        else {
            var currentX = currentCube.x;
            var currentY = currentCube.y;
            console.log("currentX: " +currentX +", currentY: " +currentY);
            didEnd = true;
            ChangeToNextCube(currentY, currentX);
            finishMap();
        }
    });
}



var tut01 = "";
tut01 += "<div class=\"enter-btn\"><\/div>";
tut01 += "                <p class=\"description\">Swipe to move. Press to start / end drawing. tap a box to teleport.<\/p>";


function detectmob() {
    return (typeof window.orientation !== 'undefined');
}

if (detectmob()) {
    changeHtml(addHandleForEnter);
}


function changeHtml(callback) {
    $("#tut01").html(tut01);
    if (callback) callback();
}
