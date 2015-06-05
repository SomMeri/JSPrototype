// shim
if (!Date.now) {
    Date.now = function now() {
        return new Date().getTime();
    };
}

var DiscreteFloatingSpeedCounter = function (gameTime, onMeasurementChange, length, unit) {
    this.unit = unit || Phaser.Timer.SECOND;
    this.length = length || 10;
    this.gameTime = gameTime;
    this.onMeasurementChange = onMeasurementChange;
    this.start();
};

DiscreteFloatingSpeedCounter.prototype.start = function () {
    this.log = [];
    this.currentCounter = 0;
    this.totalCounter = 0;
    this.measuredSpeed = 0;
    if (this.currentTimer) {
        this.gameTime.events.remove(this.currentTimer);
    }
    this.currentTimer = this.gameTime.events.loop(this.unit, function() {
        this.log.push({
            counter: this.currentCounter
        });
        this.totalCounter+=this.currentCounter;
        this.currentCounter = 0;
        if (this.log.length>this.length) {
            this.totalCounter-=this.log[0].counter;
            this.log.splice(0, 1);
        }
        this.measuredSpeed = this.totalCounter*60/this.log.length; //TODO: this assumes units are seconds
        if (this.onMeasurementChange) {
            this.onMeasurementChange(this.measuredSpeed);
        }
    }, this);
};

DiscreteFloatingSpeedCounter.prototype.countHit = function () {
    this.currentCounter++;
};

var ConstantLengthFloatingSpeedCounter = function (gameTime, onMeasurementChange) {
    this.windowLength = Phaser.Timer.SECOND*10;
    this.gameTime = gameTime;
    this.onMeasurementChange = onMeasurementChange;
    this.start();
};

ConstantLengthFloatingSpeedCounter.prototype.start = function () {
    this.log = [];
    this.currentCounter = 0;
    this.totalCounter = 0;
    this.measuredSpeed = 0;
    if (this.currentTimer) {
        this.gameTime.events.remove(this.currentTimer);
    }
    this.currentTimer = this.gameTime.events.loop(10, function() {
        var i = 0, now = Date.now();
        while (i<this.log.length && this.log[i].time<now-this.windowLength) {
            i++;
        }
        this.log.splice(0, i);

        this.measuredSpeed = this.log.length * 60*Phaser.Timer.SECOND/this.windowLength;
        if (this.onMeasurementChange) {
            this.onMeasurementChange(this.measuredSpeed);
        }
    }, this);
};

ConstantLengthFloatingSpeedCounter.prototype.countHit = function () {
    this.log.push({
        time: Date.now()
    });
};

var HitsBasedFloatingSpeedCounter = function (gameTime, onMeasurementChange) {
    this.maxBuffer = 15;
    this.gameTime = gameTime;
    this.onMeasurementChange = onMeasurementChange;
    this.start();
};

HitsBasedFloatingSpeedCounter.prototype.start = function () {
    this.log = [];
    this.currentCounter = 0;
    this.totalCounter = 0;
    this.measuredSpeed = 0;
    if (this.currentTimer) {
        this.gameTime.events.remove(this.currentTimer);
    }
    this.currentTimer = this.gameTime.events.loop(30, function() {
        var now = Date.now();
        if (this.log.length>this.maxBuffer) {
            this.log.splice(0, this.log.length - this.maxBuffer);
        }

        if (this.log.length>2) {
            this.measuredSpeed = this.log.length * 60*Phaser.Timer.SECOND/(now - this.log[0].time);
        } else {
            this.measuredSpeed = 0;
        }
        if (this.onMeasurementChange) {
            this.onMeasurementChange(this.measuredSpeed);
        }
    }, this);
};

HitsBasedFloatingSpeedCounter.prototype.countHit = function () {
    this.log.push({
        time: Date.now()
    });
};

