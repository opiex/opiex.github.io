var currentCube;
var nextCube;
var currentStage = 0;
var cubesMatrix = [];
var didStart = false;
var didEnd = false;
var isFirstKey = true;
var isSecondKey = false;
var count = 1;
var pathSoFar = [];
var lastDirection = "";
var afterPortal = "";
var isPortal = false;
var isPortalDestination = false;
var portalCounter = 0;
var mapString = "[]";


function createMatrix() {
    for (i = 0; i < 15; i++) {
        cubesMatrix.push([]);
        for (j = 0; j < 15; j++) {
            cubesMatrix[i].push(new Cube(i, j));
        }
    }
}

function buildMap() {
    for (i = 0; i < 15; i++) {
        for (j = 0; j < 15; j++)
            cubesMatrix[i][j].addByOne();
    }
    var randomX = Math.floor(Math.random() * 15);
    var randomY = Math.floor(Math.random() * 15);
    currentCube = cubesMatrix[randomX][randomY];
    currentCube.mark(cubeStateEnum.CURRENTBEFORESTART);
}

function ChangeToNextCube(y, x) {
    console.log("changing to: " + y + ", " + x);

    if (isFirstKey) {
        //$("#tut01").fadeOut(function() {
            //$("#tut02").fadeIn();
        //});
        isFirstKey = false;
    }

    if ((x < 15) || (x >= 0) || (y < 15) || (x >= 0)) {
        var nextCube = cubesMatrix[y][x];
        //only if the cube wasn't marked twice already
        if (!(nextCube.state === cubeStateEnum.MARKEDTWICE)) {
            //if didn't start, just move on
            if (!didStart) {
                currentCube.mark(cubeStateEnum.UNLIT);
                nextCube.mark(cubeStateEnum.CURRENTBEFORESTART);
            } else {
                pathSoFar.push(currentCube);
                //relevant if i went over a new cube
                if (!isPortal) {
                    if (nextCube.state === cubeStateEnum.UNLIT) {
                        if (currentCube.div.hasClass("marked-twice")) {
                            currentCube.mark(cubeStateEnum.MARKEDTWICE);
                        } else {
                            currentCube.mark(cubeStateEnum.MARKED);
                        }
                        nextCube.mark(cubeStateEnum.CURRENT);
                    }
                    //relevent if just started
                    else if (nextCube.state === cubeStateEnum.CURRENTBEFORESTART) {
                        currentCube.mark(cubeStateEnum.CURRENT);
                    }
                    //relevant to a valid step
                    else if (nextCube.state === cubeStateEnum.MARKED) {
                        if (currentCube.div.hasClass("marked-twice")) {
                            currentCube.mark(cubeStateEnum.MARKEDTWICE);
                        } else {
                            currentCube.mark(cubeStateEnum.MARKED);
                        }
                        nextCube.mark(cubeStateEnum.CURRENT);
                    }
                } else {
                    //incase of portal
                    currentCube.mark(cubeStateEnum.PORTAL);
                    nextCube.mark(cubeStateEnum.CURRENT);
                    pathSoFar.pop();
                    if (isPortalDestination) {
                        pathSoFar.push([currentCube, 'portal', nextCube]);
                    }
                }
            }
            currentCube = nextCube;
        }
        nextCube = undefined;
    }
}

$(".sq").click(function(e) {
    if (!didEnd) {
        e.preventDefault();
        var col = $(this).attr("id").replace(/\D+/g, '');
        var row = $(this).parent().attr("id").replace(/\D+/g, '');
        console.log("portal row: " + row + ", col: " + col);
        var destinationCube = cubesMatrix[row][col];
        var isValidDestination = hasEscape(destinationCube, lastDirection);
        var isValidSource = !currentCube.div.hasClass("marked-twice");
        console.log("source: " + isValidSource + ", " + "started: " + didStart + ", destination: " + isValidDestination);
        if (didStart && isValidSource && isValidDestination && portalCounter < 5) {
            beginPortal(destinationCube);
        }
    }
});

function beginPortal(destinationCube) {
    portalCounter++;
    isPortal = true;
    isPortalDestination = true;
    ChangeToNextCube(destinationCube.y, destinationCube.x);
    isPortalDestination = false;
    ChangeToNextCube(afterPortal.y, afterPortal.x);
    isPortal = false;
};

$(window).keydown(function(e) {
    if (!didEnd) {
        var key = e.keyCode;
        var currentX = currentCube.x;
        var currentY = currentCube.y;
        //right
        if (key == 39) {
            // alert('right!');
            ChangeToNextCube(currentY, currentX + 1);
            if (didStart) {
                lastDirection = directionEnum.RIGHT;
            }
        }
        //left
        else if (key == 37) {
            ChangeToNextCube(currentY, currentX - 1);
            if (didStart) {
                lastDirection = directionEnum.LEFT;
            }
        }
        //up
        else if (key == 38) {
            ChangeToNextCube(currentY - 1, currentX);
            if (didStart) {
                lastDirection = directionEnum.UP;
            }
        }
        //down
        else if (key == 40) {
            ChangeToNextCube(currentY + 1, currentX);
            if (didStart) {
                lastDirection = directionEnum.BOTTOM;
            }
        }
        //space
        else if (key == 32) {
            if (!didStart) {
                startPaintMode();
                isFirstKey = false;
                ChangeToNextCube(currentY, currentX);
            }
            //space again
            else {
                didEnd = true;
                ChangeToNextCube(currentY, currentX);
                finishMap();
            }
        } else {
            return;
        }
    }
});


function startPaintMode() {
    startTime = new Date().getTime();
    didStart = true;
    // $("html").css("background-color", "#2F3851");
    // $("body").css("color", "#fff");
}

function startGame() {
    createMatrix();
    buildMap();
}

startGame();

$("button#restart.normal").click(function(event) {
    event.preventDefault();
    restart();
});

function finishMap() {

    $("#tut01").fadeOut(function() {
      $("#tut02").fadeOut();
    });

    $("html").css("background-color", "#fff");
    $("body").css("color", "#000");
    mapString = "[";
    for (i = 1; i < pathSoFar.length - 1; i++) {
        if (pathSoFar[i].length === 3) {
            mapString = mapString + "[[" + pathSoFar[i][0].y + "," + pathSoFar[i][0].x + "],";
            mapString = mapString + "'portal'," + "[" + pathSoFar[i][2].y + "," + pathSoFar[i][2].x + "]],";
        } else {
            mapString = mapString + "[" + pathSoFar[i].y + "," + pathSoFar[i].x + "],";
        }
    }
    mapString = mapString + "[" + pathSoFar[i].y + "," + pathSoFar[i].x + "]]";
    console.log(mapString.toString());

    for (i = 0; i < pathSoFar.length; i++) {
        if (pathSoFar[i].length != 3) {
            var current = pathSoFar[i].div;
            current.addClass("inside-final");
            if (current.hasClass("marked-twice")) {
                current.removeClass().addClass("sq marked-twice-final");
            }
        }
    }

    $('#tut01').fadeOut(function(){
      $('#finished-map-message').fadeIn();
    });
    console.log("successfuly ended.");

}

function restart(){
}

function openSubmit(){
  $('.form-overlay').fadeIn();
}

function restart() {
    currentCube = "";
    nextCube = "";
    didStart = false;
    didEnd = false;
    isFirstKey = true;
    isSecondKey = false;
    count = 1;
    pathSoFar = [];
    lastDirection = "";
    afterPortal = "";
    isPortal = false;
    isPortalDestination = false;
    portalCounter = 0;
    mapString = "[]";

    $("html").css("background-color", "#2F3851");
    $("body").css("color", "#fff");
    $(".tutorial").children().fadeOut(function() {
        $("#tut01").fadeIn();
    });

    for (i = 0; i < 15; i++) {
        for (j = 0; j < 15; j++)
            if(cubesMatrix[i][j].div.hasClass("inside-final")){
              cubesMatrix[i][j].mark(cubeStateEnum.UNLIT);
            }
    }

    buildMap();

}
