

function startGame() {
    myGameArea.start();
    gpRight = new component(40, 65, "red", 200, 650);
    gpLeft = new component(40, 65, "blue", 160, 650);
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

var keyPressed = {}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 400;
        this.canvas.height = 800;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 10);
        window.addEventListener('keydown', function (e) {
            keyPressed[e.keyCode] = true;
        })
        window.addEventListener('keyup', function (e) {
            keyPressed[e.keyCode] = false;
        })
    },

    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function updateGameArea() {
    myGameArea.clear();
    gpLeft.speedX = 0;
    gpRight.speedX = 0;
    if (keyPressed["39"] && keyPressed["37"]) {
        gpLeft.speedX = -4;
        gpRight.speedX = 4;
        if (gpLeft.x == 0) {
            gpLeft.speedX = 0;
        }
        if (gpRight.x == 360) {
            gpRight.speedX = 0;
        }
    }
    else if (keyPressed["39"]) {
        gpLeft.speedX = 4;
        gpRight.speedX = 4;
        if (gpRight.x == 360 || gpLeft.x == 0) {
            gpLeft.speedX = 0;
            gpRight.speedX = 0;
        }
    } else if (keyPressed["37"]) {
        gpLeft.speedX = -4;
        gpRight.speedX = -4;
        if (gpLeft.x == 0 || gpRight.x == 360) {
            gpLeft.speedX = 0;
            gpRight.speedX = 0;
        }
    } else {
        gpLeft.x = 160;
        gpRight.x = 200;
    }

    gpLeft.newPos();
    gpLeft.update();
    gpRight.newPos();
    gpRight.update();
}