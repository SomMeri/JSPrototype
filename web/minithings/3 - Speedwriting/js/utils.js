function isWhitespace(string, index) {
    return isSpace(string, index) || string[index] == "\n";
}

function isSpace(string, index) {
    return string[index] == " ";
}

function interpolateColor(color1, color2, steps, currentStep, alpha) {
    if (typeof alpha === "undefined") { alpha = 255; }

    var src1 = Phaser.Color.getRGB(color1);
    var src2 = Phaser.Color.getRGB(color2);
    var r = (((src2.red - src1.red) * currentStep) / steps) + src1.red;
    var g = (((src2.green - src1.green) * currentStep) / steps) + src1.green;
    var b = (((src2.blue - src1.blue) * currentStep) / steps) + src1.blue;

    var result = '#' + ((1 << 24) + (Math.floor(r) << 16) + (Math.floor(g) << 8) + Math.floor(b)).toString(16).slice(1);
    return result;

}

function throwDice(sides) {
    var randomnum=getRandomInt(0, sides);
    return randomnum===0;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDouble(min, max) {
    return Math.random() * (max - min) + min;
}

function saveMaxScore(key, maxScore) {
    key = key || "";
    try {
        window.localStorage.setItem(document.URL + key + "highscore", JSON.stringify(maxScore));
    } catch(e) {}
}

function loadMaxScore(key, ifUnknown, ifError) {
    key = key || "";
    try {
        var state = window.localStorage.getItem(document.URL + key  + "highscore");
        if (state) {
            return JSON.parse(state);
        } else {
            return ifUnknown;
        }
    } catch(e) {
        return ifError || -1;
    }

}