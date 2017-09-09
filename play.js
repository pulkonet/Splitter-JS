var innerObstacle = [];
var outerObstacle = [];

function startGame() {
    myGameArea.start();
    myGameStack = new component(900, 480, "gray", 30, 30);
    myGamePiece = new component(7, 7, "red", 480, 510);
    level = 1;
    x = Math.random() * 893 + 30;
    y = Math.random() * 473 + 30;
    innerObstacle.push(new component(7, 7, "green", x, y));
    // levelChange = true;
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    this.update = function () {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    }
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 960;
        this.canvas.height = 540;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 10);
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
        })
    },

    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function updateGameArea() {

    if (level == 1) {
        for (i = 0; i < innerObstacle.length; i += 1) {
            // innerObstacle[i].x += -1;
            innerObstacle[i].speedX = Math.random() < 0.5 ? -1 : 1;
            innerObstacle[i].speedY = Math.random() < 0.5 ? -1 : 1;
        }
        level += 1;
    }
    myGameArea.clear();
    if (level < 14) {
        // myGamePiece.x = 480;
        // myGamePiece.y = 510;
        myGamePiece.speedX = 0;
        myGamePiece.speedY = 0;

        if (myGameArea.key && myGameArea.key == 37) { myGamePiece.speedX = -2; }
        if (myGameArea.key && myGameArea.key == 39) { myGamePiece.speedX = 2; }
        if (myGameArea.key && myGameArea.key == 38) { myGamePiece.speedY = -2; }
        if (myGameArea.key && myGameArea.key == 40) { myGamePiece.speedY = 2; }
        if (myGamePiece.x >= 953 && myGamePiece.speedX > 0) {
            myGamePiece.speedX = 0;
        }
        if (myGamePiece.y >= 533 && myGamePiece.speedY > 0) {
            myGamePiece.speedY = 0;
        }
        if (myGamePiece.x <= 0 && myGamePiece.speedX < 0) {
            myGamePiece.speedX = 0;
        }
        if (myGamePiece.y <= 0 && myGamePiece.speedY < 0) {
            myGamePiece.speedY = 0;
        }
    }
    myGameStack.update();
    for (i = 0; i < innerObstacle.length; i += 1) {
        if(innerObstacle[i].x < 30 || innerObstacle[i].x > 923){
            innerObstacle[i].speedX *= -1;
        }
        if(innerObstacle[i].y < 30 || innerObstacle[i].y > 503){
            innerObstacle[i].speedY *= -1;
        }
        innerObstacle[i].newPos();
        innerObstacle[i].update();
    }
    myGamePiece.newPos();
    myGamePiece.update();
}