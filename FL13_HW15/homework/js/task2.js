const INCREASE_INTERVAL = 2000;
const DECREASE_INTERVAL = 1500;
const OVERHEATING = 30;

class Vehicle {
    constructor(color, engine) {
        this.color = color;
        this.engine = engine;
        this.maxSpeed = 70;
        this.moving = false;
        this.stoping = false;
        this.speed = 0;
        this.timerId = null;
        this.reachedSpeed = 0;
    }

    showStopMessage() {
        console.log(`Vehicle is stopped. Maximum speed during the drive was ${this.reachedSpeed}`);
    }
}

Vehicle.prototype.upgradeEngine = function(newEngine, maxSpeed) {
    if (!this.moving) {
        this.engine = newEngine;
        this.maxSpeed = maxSpeed;
    }
};

Vehicle.prototype.getInfo = function() {
    console.log({
        engine: this.engine,
        color: this.color,
        maxSpeed: this.maxSpeed
    });
};

Vehicle.prototype.drive = function() {
    if (this.moving) {
       return;
    }

    this.moving = true;

    this.timerId = setInterval(() => {
        this.speed += 20;
        this.reachedSpeed = this.speed;
        if (this.speed > this.maxSpeed) {
            console.log('speed is too high, SLOW DOWN!');
        }

    }, INCREASE_INTERVAL);
};

Vehicle.prototype.stop = function() {
    if (this.stoping) {
        console.log('Already slows down');

        return;
    }

    clearInterval(this.timerId);
    this.stoping = true;

    this.timerId = setInterval(() => {
        this.speed -= 20;

        if (this.speed < 0) {
            this.speed = 0;
            this.stoping = false;
            this.moving = false;
            clearInterval(this.timerId);
            this.showStopMessage();
        }

    }, DECREASE_INTERVAL);
};


class Car extends Vehicle {
    constructor(color, engine, model) {
        super(color, engine);
        this.maxSpeed = 80;
        this.model = model;
    }

    showStopMessage() {
        console.log(`Car ${this.model} is stopped. Maximum speed during the drive ${this.reachedSpeed}`);
    }
}

class Motorcycle extends Vehicle {
    constructor(color, engine, model) {
        super(color, engine);
        this.maxSpeed = 90;
        this.model = model;
    }

    showStopMessage() {
        console.log(`Motorcycle ${this.model} is stopped. Good drive`);
    }
}

Motorcycle.prototype.drive = function() {
    if (this.moving) {
        return;
    }

    console.log('Let’s drive');

    this.moving = true;

    this.timerId = setInterval(() => {
        this.speed += 20;
        this.reachedSpeed = this.speed;

        if (this.speed > this.maxSpeed) {
            console.log('speed is too high, SLOW DOWN!');

            if (this.speed - this.maxSpeed >= OVERHEATING) {
                console.log('Engine overheating');

                clearInterval(this.timerId);
                this.stop();
            }
        }

    }, INCREASE_INTERVAL);
};

Car.prototype.getInfo = Motorcycle.prototype.getInfo = function() {
    console.log({
        engine: this.engine,
        color: this.color,
        maxSpeed: this.maxSpeed,
        model: this.model
    });
};

Car.prototype.changeColor = function(newColor) {
    if(this.color === newColor) {
        console.log('New color is the same as current');

        return;
    }

    this.color = newColor;
};