var directionEnum = Object.freeze({
    UP: 0,
    RIGHT: 1,
    BOTTOM: 2,
    LEFT: 3
});

function hasEscapeCreator(destinationCube, direction) {
    //check clicked
    var x = destinationCube.x;
    var y = destinationCube.y;

    if (!destinationCube.isUnlit()) {
        return false;
    };
    console.log("direction: " + lastDirection);
    //check top
    switch (direction) {
        case directionEnum.UP:
            if (destinationCube.y > 0) {
                afterPortal = cubesMatrix[y - 1][x];
                if (afterPortal.isUnlit() || afterPortal.isMarked()) {
                    return true;
                }
            };
            break;
        case directionEnum.RIGHT:
            if (destinationCube.x < 14) {
                console.log("x is " + destinationCube.x);
                afterPortal = cubesMatrix[y][x + 1];
                if (afterPortal.isUnlit() || afterPortal.isMarked()) {
                    return true;
                }
            };
            break;
        case directionEnum.BOTTOM:
            //check bottom
            console.log("destcube y: " + destinationCube.y);
            if (destinationCube.y < 14) {
                afterPortal = cubesMatrix[y + 1][x];
                if (afterPortal.isUnlit() || afterPortal.isMarked()) {
                    return true;
                }
            };
            break;
        case directionEnum.LEFT:
            //check left
            if (destinationCube.x > 0) {
                afterPortal = cubesMatrix[y][x - 1];
                if (afterPortal.isUnlit() || afterPortal.isMarked()) {
                    return true;
                }
            };
            break;
    }

    return false;
};

function hasEscape(destinationCube, direction) {
    //check clicked
    var x = destinationCube.x;
    var y = destinationCube.y;

    console.log("direction: " + lastDirection);
    //check top
    switch (direction) {
        case directionEnum.UP:
            if (destinationCube.y > 0) {
                afterPortal = cubesMatrix[y - 1][x];
                if (!(afterPortal.isOutside() || afterPortal.isMarkedTwice() || afterPortal.isPortal())) {
                    return true;
                }
            };
            break;
        case directionEnum.RIGHT:
            if (destinationCube.x < 14) {
                console.log("x is " + destinationCube.x);
                afterPortal = cubesMatrix[y][x + 1];
                if (!(afterPortal.isOutside() || afterPortal.isMarkedTwice() || afterPortal.isPortal())) {
                    return true;
                }
            };
            break;
        case directionEnum.BOTTOM:
            //check bottom
            console.log("destcube y: " + destinationCube.y);
            if (destinationCube.y < 14) {
                afterPortal = cubesMatrix[y + 1][x];
                if (!(afterPortal.isOutside() || afterPortal.isMarkedTwice() || afterPortal.isPortal())) {
                    return true;
                }
            };
            break;
        case directionEnum.LEFT:
            //check left
            if (destinationCube.x > 0) {
                afterPortal = cubesMatrix[y][x - 1];
                if (!(afterPortal.isOutside() || afterPortal.isMarkedTwice() || afterPortal.isPortal())) {
                    return true;
                }
            };
            break;
    }

    return false;
};
