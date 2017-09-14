var currentCube;
var nextCube;
var currentStageNumber;
var cubesMatrix = [];
var didStart = false;
var didLose = false;
var didWin = false;
var isFirstKey = true;
var isSecondKey = false;
var count = 1;
var pathSoFar = [];
var startTime;
var endTime;
var afterPortal;
var lastDirection;
var portalCounter = 0;
var currentStage = [];

function createMatrix() {
    for (i = 0; i < 15; i++) {
        cubesMatrix.push([]);
        for (j = 0; j < 15; j++) {
            cubesMatrix[i].push(new Cube(i, j));
        }
    }
}

function createStage(stageNumber) {
    currentStage = stages[stageNumber].path;
    loadLevelName();
    for (i = 0; i < currentStage.length; i++) {
        if (currentStage[i].length != 3) {
            var y = currentStage[i][0];
            var x = currentStage[i][1];
            cubesMatrix[y][x].addByOne();
            cubesMatrix[y][x].div.addClass("canstart");
        } else {
            portalCounter++;
            //portal
            //first portal
            var y1 = currentStage[i][0][0];
            var x1 = currentStage[i][0][1];
            cubesMatrix[y1][x1].mark(cubeStateEnum.PORTAL);
            //second portal
            var y2 = currentStage[i][2][0];
            var x2 = currentStage[i][2][1];
            cubesMatrix[y2][x2].mark(cubeStateEnum.PORTAL);

            //match
            cubesMatrix[y1][x1].PortalPartner = cubesMatrix[y2][x2];
            cubesMatrix[y2][x2].PortalPartner = cubesMatrix[y1][x1];
        }
    }
    var elementToStart = currentStage[Math.floor(Math.random() * currentStage.length)];
    while (elementToStart.length === 3) {
        var elementToStart = currentStage[Math.floor(Math.random() * currentStage.length)];
    }
    currentCube = cubesMatrix[elementToStart[0]][elementToStart[1]];
    currentCube.mark(cubeStateEnum.CURRENTBEFORESTART);
}

function ChangeToNextCube(y, x) {
    console.log("changing to: " + y + ", " + x);

    if (isFirstKey) {
        $("#tut01").fadeOut(function() {
            isFirstKey = false;
            $("#tut02").fadeIn();
        });
    }
    if ((x < 15) || (x >= 0) || (y < 15) || (x >= 0)) {
        var nextCube = cubesMatrix[y][x];
        if (!((nextCube.state === cubeStateEnum.OUTSIDE) || (nextCube.state === cubeStateEnum.PORTAL))) {
            if (!didStart) {
                if (currentCube.div.hasClass("unlit-twice")) {
                    currentCube.mark(cubeStateEnum.UNLITTWICE);
                } else {
                    currentCube.mark(cubeStateEnum.UNLIT);
                }
                nextCube.mark(cubeStateEnum.CURRENTBEFORESTART);
            } else {
                pathSoFar.push(currentCube);
                //relevant if i did a faul and game over
                if (nextCube.state === cubeStateEnum.MARKED) {
                    console.log("marking both as return");
                    currentCube.mark(cubeStateEnum.RETURN);
                    nextCube.mark(cubeStateEnum.RETURN);
                    didLose = true;
                    gameOver();
                }
                //relevent to before start
                else if (nextCube.state === cubeStateEnum.CURRENTBEFORESTART) {
                    currentCube.mark(cubeStateEnum.CURRENT);
                }
                //relevant to a valid step
                else {
                    count++;
                    currentCube.reduceByOne();
                    nextCube.mark(cubeStateEnum.CURRENT);
                    checkIfWin();
                }
            }
            currentCube = nextCube;
        } else if (nextCube.state === cubeStateEnum.PORTAL) {
            console.log("next cube: [" + nextCube.y + ", " + nextCube.x + "] direction: " + lastDirection);
            if (hasEscape(nextCube.PortalPartner, lastDirection)) {
                ChangeToNextCube(afterPortal.y, afterPortal.x);
            }
        }
    }
    nextCube = undefined;
};

$(".sq").click(function(e) {
  if($(this).hasClass("canstart")){
      e.preventDefault();
      if (!didStart) {
          var newX = $(this).attr("id").replace(/\D+/g, '');
          var newY = $(this).parent().attr("id").replace(/\D+/g, '');
          ChangeToNextCube(newY, newX);
      }
  }
});

$(window).keydown(function(e) {
    var key = e.keyCode;
    if (key == 82) {
        restart();
    };

    if (!didLose && !didWin) {
        var currentX = currentCube.x;
        var currentY = currentCube.y;
        //right
        if (key == 39) {
            //right
            lastDirection = directionEnum.RIGHT;
            ChangeToNextCube(currentY, currentX + 1);
        }
        //left
        else if (key == 37) {
            lastDirection = directionEnum.LEFT;
            ChangeToNextCube(currentY, currentX - 1);
        }
        //up
        else if (key == 38) {
            lastDirection = directionEnum.UP;
            ChangeToNextCube(currentY - 1, currentX);
        }
        //down
        else if (key == 40) {
            lastDirection = directionEnum.BOTTOM;
            ChangeToNextCube(currentY + 1, currentX);
        }
        //space
        else if (key == 32) {
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
        } else {
            return;
        }
    } else {
        if (didLose && (key == 32)) {
            restart();
        } else if (didWin && (key == 32)) {
            startNextLevel();
        }
    }
});

function checkIfWin() {
    if (count === stages[currentStageNumber - 1].length) {
        didWin = true;
        count++;
        gameWon();
    }
}

function startPlayMode() {
    startTime = new Date().getTime();
    didStart = true;
    for (i = 0; i < currentStage.length; i++) {
        if (currentStage[i].length != 3) {
            var y = currentStage[i][0];
            var x = currentStage[i][1];
            cubesMatrix[y][x].div.removeClass("canstart", function() {});
        }
    }
    $("html").css("background-color", "#2F3851");
    $("body").css("color", "#fff");
    $("a").css("color", "#fff");
}

function startGame() {
    document.title = "Tiny Boxes | Level " +currentStageNumber;
    createMatrix();
    createStage(currentStageNumber - 1);
}

$.getJSON("json/stages.json", function(data) {
    data.stages.forEach(function(stage, i) {
        var stageElement = new Stage(stage.path, stage.levelName, stage.creatorName, stage.creatorUrl);
        stages.push(stageElement);
    });
    currentStageNumber = parseCurrentStageNumber();
    startGame();
});

$(window).on('hashchange', function() {
  currentStageNumber = parseCurrentStageNumber();
  restart();
});

$("button#restart.normal").click(function(event) {
    event.preventDefault();
    restart();
});

$("button#share-game.normal").click(function(event){
  event.preventDefault;
  FB.ui({
    method: 'share',
    display: 'popup',
    href: window.location.protocol + '//' + window.location.host + window.location.pathname
  }, function(response){});
})


$("button#share.normal").click(function(event){
  event.preventDefault;
  FB.ui({
    method: 'share',
    display: 'popup',
    href: window.location.protocol + '//' + window.location.host + window.location.pathname
  }, function(response){});
})

$("button#level-creator").click(function(event) {
    event.preventDefault();
    startLevelCreator();
})

$("button#next.normal").click(function(event) {
    event.preventDefault();
    startNextLevel();
});

function startNextLevel() {
    if (currentStageNumber < stages.length) {
        currentStageNumber++;
        var nextLevel = '?level=' +(currentStageNumber);
        history.replaceState( {state:currentStageNumber} , 'Tiny Boxes | Level ' +currentStageNumber, nextLevel);
        restart();
    }
};

function gameWon() {
    changeTextOfTutorial();
    endTime = new Date().getTime();
    var totalTime = (endTime - startTime) / 1000;
    for (var i = 0; i < pathSoFar.length; i++) {
        pathSoFar[i].mark(cubeStateEnum.WON);
    }
    $("#tut03").fadeOut(function() {
        $("#gamewon").find("#finish-time").text("Well Done! Finished in " + totalTime + " seconds.");
        if (currentStageNumber < stages.length) {
            $("#gamewon").fadeIn();
        } else {
            var nextStage = parseInt(currentStageNumber) + 1;
            $("#gamewon").find("#game-completed").html("Game completed, congrats! \nCan your friends complete it too?").wrap('<pre />');;
            $("#gamewon").find("#game-completed").show();
            $("#gamewon").find("button#next").hide();
            $("#gamewon").find("button#share-game").show();
            $("#gamewon").fadeIn();
        }
    });
}

function gameOver() {
    $("#tut03").fadeOut(function() {
        $("#gameover").fadeIn();
    });
    var stage = stages[currentStageNumber - 1];
    console.log("game over.. now looping and marking");
    for (i = 0; i < pathSoFar.length; i++) {
        console.log("marking " + pathSoFar[i] + " as return");
        pathSoFar[i].mark(cubeStateEnum.RETURN);
    }
};

function changeTextOfTutorial() {
    $("#tut01").find("p.description").text("Choose a starting point.");
    $("#tut02").find("p.description").text("Start when you're ready");
}

function restart() {
    portalCounter = 0;
    currentCube = "";
    nextCube = "";
    cubesMatrix = [];
    didStart = false;
    didLose = false;
    didWin = false;
    isFirstKey = true;
    isSecondKey = false;
    count = 1;
    pathSoFar = [];
    $("html").css("background-color", "#fff");
    $("body").css("color", "#000");
    $("a").css("color", "#000");
    $(".tutorial").children().fadeOut(function() {
        $("#tut01").fadeIn();
    });
    loadLevelName();
    startGame();
}

function loadLevelName(){
  $("#levelName").text(currentStageNumber +". " +stages[currentStageNumber - 1].levelName);
  $("#creatorUrl").text(stages[currentStageNumber - 1].creatorName);
  $("#creatorUrl").attr("href", stages[currentStageNumber - 1].creatorUrl);
}
