var cubeStateEnum = Object.freeze({
	OUTSIDE: 0,
	UNLIT: 1,
	UNLITTWICE: 2,
	MARKED: 3,
	CURRENT: 4,
	CURRENTBEFORESTART: 5,
	RETURN: 6,
	MARKEDTWICE: 7,
	PORTAL: 8,
	WON: 9
});

var Cube = function(y, x) {
	this.y = y;
	this.x = x;
	this.div = $("#col" + y).find("#sq" + x);
	this.mark(cubeStateEnum.OUTSIDE);
	this.PortalPartner = "";
}


Cube.prototype.mark = function(newstatus) {
	this.state = newstatus;
	switch (newstatus) {
		case cubeStateEnum.OUTSIDE:
			this.div.removeClass().addClass("sq outside");
			break;
		case cubeStateEnum.UNLIT:
			this.div.removeClass().addClass("sq unlit");
			break;
		case cubeStateEnum.UNLITTWICE:
			this.div.removeClass().addClass("sq unlit-twice");
			break;
		case cubeStateEnum.MARKED:
			this.div.removeClass().addClass("sq marked");
			break;
		case cubeStateEnum.CURRENT:
			if (this.div.hasClass("unlit-twice")) {
				this.div.removeClass().addClass("sq current unlit-twice");
			} else if (this.div.hasClass("marked")) {
				this.div.removeClass().addClass("sq current marked-twice");
			} else {
				this.div.removeClass().addClass("sq current");
			}
			break;
		case cubeStateEnum.PORTAL:
				this.markAsPortal();
				break;
		case cubeStateEnum.WON:
			this.div.removeClass().addClass("sq won");
			break;
		case cubeStateEnum.CURRENTBEFORESTART:
			if (this.div.hasClass("unlit-twice")) {
				this.div.removeClass().addClass("sq current-beforestart unlit-twice");
			} else {
				this.div.removeClass().addClass("sq current-beforestart");
			}
			break;
		case cubeStateEnum.RETURN:
			this.div.removeClass().addClass("sq return");
			break;
		case cubeStateEnum.MARKEDTWICE:
			this.div.removeClass().addClass("sq marked-twice marked");
	}
}


Cube.prototype.reduceByOne = function() {
	if (this.div.hasClass("unlit-twice")) {
		this.mark(cubeStateEnum.UNLIT);
		console.log("reduced by one. new status: unlit");
	} else {
		this.mark(cubeStateEnum.MARKED);
		console.log("reduced by one. new status: marked");
	}
}

Cube.prototype.addByOne = function() {
	if (this.state === cubeStateEnum.UNLIT) {
		this.mark(cubeStateEnum.UNLITTWICE);
	} else {
		this.mark(cubeStateEnum.UNLIT);
	}
}

Cube.prototype.isUnlit = function() {
	console.log("checking if " +this.y +", " +this.x +" is unlit... ");
	return this.state === cubeStateEnum.UNLIT;
}

Cube.prototype.isMarked = function() {
	return this.state === cubeStateEnum.MARKED;
}

Cube.prototype.isOutside = function() {
	return this.state === cubeStateEnum.OUTSIDE;
}

Cube.prototype.isPortal = function() {
	return this.state === cubeStateEnum.PORTAL;
}

Cube.prototype.isMarkedTwice = function() {
	return this.state === cubeStateEnum.MARKEDTWICE;
}

Cube.prototype.markAsPortal = function() {
	this.div.removeClass().addClass("sq portal portal" +portalCounter);
}
