// shim
if (!Date.now) {
    Date.now = function now() {
        return new Date().getTime();
    };
}

var OverallSpeedCounter = function (gameTime, max, startingPoint, tick) {
    this.max = max || 41;
    this.startingPoint = startingPoint || 20;
    this.gameTime = gameTime;
    this.minBar = this.max+1;
    this.maxBar = -1;
    this.tick = tick || 390;
    this.start();
};

OverallSpeedCounter.prototype.start = function () {
    this.bar = this.startingPoint;
    this.barChanged();
    if (this.currentTimer) {
        this.gameTime.events.remove(this.currentTimer);
    }
    this.currentTimer = this.gameTime.events.loop(this.tick, function() { //original 500
        this.bar--;
        this.barChanged();
    }, this);
};

OverallSpeedCounter.prototype.countHit = function () {
    this.bar++;
    this.barChanged();
};

OverallSpeedCounter.prototype.mishit = function () {
    this.bar-=4;
    this.barChanged();
};

OverallSpeedCounter.prototype.barChanged = function () {
    if (this.bar < 0) {
        this.bar = 0;
    }
    if (this.bar > this.max) {
        this.bar = this.max;
    }

    if (this.bar<this.minBar) {
        this.minBar = this.bar;
    }
    if (this.bar>this.maxBar) {
        this.maxBar = this.bar;
    }
}
