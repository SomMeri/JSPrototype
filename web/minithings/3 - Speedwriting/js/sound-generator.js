var SoundGenerator = function() {
    this.start();
    this.chord = [62, 65, 69, 60,64,67];//[60,64,67]; //scale: [55, 57, 59, 60, 62, 64, 66]; - chord was better
    this.chordPosition=0;
    this.songPosition=0;
    this.createKeyToMidiTable();
//    this.songStr = 'G3,D4,D4,E4,D4,C4,C4,E4,F4,A4,C5,A4,A4,G4,G4,A4,B3,B3,A4'; //can can nic moc
    this.songStr = 'C4,E4,G4,D4,F4,A4,E4,G4,H4,D4,F4,A4,C4,E4,G4'; //CHORDS
//    this.songStr = 'C4,E4,G4,C4,E4,G4,D4,F4,A4,E4,G4,H4,E4,G4,H4,E4,G4,H4';
//    this.songStr = 'D4,D4,E4,F4,F4,E4,D4,C+4,B3,B3,C+4,D4'; // Ode to Joy
//    this.songStr = 'C4,C4,F4,F4,C4,C4,G3,G3,C4,C4,F4,C4,G3,G3'; // File:Gregory Walker root progression.PNG
    this.songStr = 'E4,D+4,E4,D+4,E4,B3,D4,C4,A3,C3,E3,A3,B3,E3,G+3,B3,C4,E3'; //elise - ACCEPTABLE
//http://www.gangqinpu.com/fullread.asp?id=10215
    //this.songStr = 'E4,D4,E4,D4,E4,D4,E4,D4,E4,D4';
    this.songStr =  'A4,A4,A4,A4,A4,A4,A4,D4,F4,A4,G4,G4,G4,G4,G4,G4,G4,C4,E4,G4,'; //drunken whaler
    this.songStr += 'A4,A4,A4,A4,A4,A4,A4,B4,C5,D5,C5,A4,G4,E4,D4,D4,A4,A4,A4,A4,';
    this.songStr += 'D4,F4,A4,G4,G4,G4,G4,C4,E4,G4,A4,A4,A4,A4,B4,C5,D5,C5,A4,G4,E4,D4,D4';
    this.song = this.songStr.split(',');
    this.notesLibrary = [];
};

SoundGenerator.prototype.createKeyToMidiTable = function () {
    this.keyToMidi = { 'C3': 48,
        'C+3': 49,
        'D3': 50,
        'D+3': 51,
        'E3': 52,
        'F3': 53,
        'F+3': 54,
        'G3': 55,
        'G+3': 56,
        'A3': 57,
        'A+3': 58,
        'B3': 59,
        'C4': 60,
        'C+4': 61,
        'D4': 62,
        'D+4': 63,
        'C4': 60,
        'C+4': 61,
        'D4': 62,
        'D+4': 63,
        'E4': 64,
        'F4': 65,
        'F+4': 66,
        'G4': 67,
        'G+4': 68,
        'A4': 69,
        'A+4': 70,
        'B4': 71,
        'C5': 72,
        'C#5': 73,
        'D5': 74,
        'D+5': 75,
        'E5': 76
    }
};

SoundGenerator.prototype.createSound = function (midiCode) {
    var fromFrequency = this.midicps[midiCode];
    this.table = [fromFrequency, [fromFrequency/2, "200ms"]];

    var freq = T("env", {table: this.table}).on("bang", function () {
        VCO.mul = 0.2;
    }).on("ended", function () {
        VCO.mul = 0;
    });

    var VCO = T("saw", {freq:freq, mul:0}).play();

    return freq;
}


SoundGenerator.prototype.start = function () {
//    this.startSimple();

    this.midicps = (function() {
        var table = new Float32Array(128);
        for (var i = 0; i < 128; ++i) {
            table[i] = 440 * Math.pow(2, (i - 69) * 1 / 12);
        }
        return table;
    })();
    this.count = 50;
};

SoundGenerator.prototype.startSimple = function () {
    this.synth = T("OscGen", {wave:"saw", mul:0.25}).play();
};

SoundGenerator.prototype.hit = function () {
    var midiCodeToPlay = this.keyToMidi[this.song[this.songPosition]];

    if (!this.notesLibrary[midiCodeToPlay]) {
        this.notesLibrary[midiCodeToPlay] = this.createSound(midiCodeToPlay);
    }

    if (!game.sound.mute) {
        this.notesLibrary[midiCodeToPlay].bang();
    }
    //this.notesLibrary
        //this.synth.noteOnWithFreq(this.midicps[this.keyToMidi[this.song[this.songPosition]]], 100);
    //this.table[0] = this.midicps[this.keyToMidi[this.song[this.songPosition]]];//[1760, [110, "200ms"]];

    //for(var propName in this.synth) {
    //    var propValue = this.synth[propName];
    //    if (typeof(propValue) !== "function" ) {
    //        console.log(propName + " " +propValue);
    //    }
    //}

//    this.synth.bang();

    this.songPosition++
    if (this.songPosition>=this.song.length) {
        this.songPosition = 0;
    }

    this.chordPosition++
    if (this.chordPosition>=this.chord.length) {
        this.chordPosition = 0;
    }

}

/*
 var synth = T("OscGen", {wave:"saw", mul:0.25}).play();

 var keydict = T("ndict.key");
 var midicps = T("midicps");
 T("keyboard").on("keydown", function(e) {
 var midi = keydict.at(e.keyCode);
 if (midi) {
 var freq = midicps.at(midi);
 synth.noteOnWithFreq(freq, 100);
 }
 }).on("keyup", function(e) {
 var midi = keydict.at(e.keyCode);
 if (midi) {
 synth.noteOff(midi, 100);
 }
 }).start();
 */

 /* sound effect
 // Change from 1760Hz to 220Hz in 200ms.
 var table = [1760, [110, "200ms"]];

 var freq = T("env", {table:table}).on("bang", function() {
 VCO.mul = 0.2;
 }).on("ended", function() {
 VCO.mul = 0;
 });
 var VCO = T("saw", {freq:freq, mul:0}).play();

 var keydict = T("ndict.key");
 var midicps = T("midicps");
 T("keyboard").on("keydown", function(e) {
 freq.bang(); // Start the envelope
 }).start();
 */


/*
 var NDictKey = {
 90 : 48, // Z -> C3
 83 : 49, // S -> C+3
 88 : 50, // X -> D3
 68 : 51, // D -> D+3
 67 : 52, // C -> E3
 86 : 53, // V -> F3
 71 : 54, // G -> F+3
 66 : 55, // B -> G3
 72 : 56, // H -> G+3
 78 : 57, // N -> A3
 74 : 58, // J -> A+3
 77 : 59, // M -> B3
 188: 60, // , -> C4
 76 : 61, // L -> C+4
 190: 62, // . -> D4
 186: 63, // ; -> D+4

 81 : 60, // Q -> C4
 50 : 61, // 2 -> C+4
 87 : 62, // W -> D4
 51 : 63, // 3 -> D+4
 69 : 64, // E -> E4
 82 : 65, // R -> F4
 53 : 66, // 5 -> F+4
 84 : 67, // T -> G4
 54 : 68, // 6 -> G+4
 89 : 69, // Y -> A4
 55 : 70, // 7 -> A+4
 85 : 71, // U -> B4
 73 : 72, // I -> C5
 57 : 73, // 9 -> C#5
 79 : 74, // O -> D5
 48 : 75, // 0 -> D+5
 80 : 76  // P -> E5
 };
 */

/*
 C + Eb + G
 D + F + A
 Eb + G + B
 F + A + C
 G + B + D
 A + C + Eb
 B + D + F

 Now, let’s analyze those chords to see what we’re playing here…

 C + Eb + G = C minor
 D + F + A = D minor
 Eb + G + B = Eb augmented
 F + A + C = F major
 G + B + D = G major
 A + C + Eb = A diminished
 B + D + F = B diminished
 */