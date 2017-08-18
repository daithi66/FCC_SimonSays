var simon = {delay:"1000",    // one global object (better than global variables)
pause:"500",
playArray:[],
mode:"Easy",
buttonsEnabled:true,
onSound:0,
score:0,
winner:20,
gameOver:false
};

$(".hover").hover(function() {
if (!simon.buttonsEnabled) {
$(this).css('cursor','default');
return;
}
$(this).css('cursor','pointer');
}, function() {
$(this).css('cursor','default');
});

$("#easyMode").mousedown(function() {
simon.mode = "Easy";
simon.score = 0;
simon.onSound = 0;
simon.gameOver = false;
simon.playArray = [];
simon.playArray.push(Math.floor((Math.random() * 4) + 1));
$("#easyMode").fadeOut(100);
$("#easyMode").fadeIn(400);
$("#score > p:nth-child(1)").html("00");
$("#score > p:nth-child(2)").html("EASY");
playSounds();
});

$("#hardMode").mousedown(function() {
simon.mode = "Hard";
simon.score = 0;
simon.onSound = 0;
simon.gameOver = false;
simon.playArray = [];
simon.playArray.push(Math.floor((Math.random() * 4) + 1));
$("#hardMode").fadeOut(100);
$("#hardMode").fadeIn(400);
$("#score > p:nth-child(1)").html("00");
$("#score > p:nth-child(2)").html("HARD");
playSounds();
});

$(".soundButton").mousedown(function() {
const RED = 1;
const BLUE = 2;
const YELLOW = 3;
const GREEN = 4;
if (!simon.buttonsEnabled) {
return;
}
var  ok = true;
if (this.id === "greenArea" && simon.playArray[simon.onSound] === GREEN) {
playGreen();
} else if (this.id === "blueArea" && simon.playArray[simon.onSound] === BLUE) {
playBlue();
} else if (this.id === "yellowArea" && simon.playArray[simon.onSound] === YELLOW) {
playYellow();
} else if (this.id === "redArea" && simon.playArray[simon.onSound] === RED) {
playRed();
} else {
ok = false;
} 
simon.onSound++;
if (ok && simon.onSound === simon.winner) {
handleWinningButton();
} else if (ok && simon.onSound === simon.playArray.length) {
handleAddButton();
} else if (!ok) {
handleWrongButton();
}
});

function handleWinningButton () {
$("#score > p:nth-child(1)").html("WINNER!");
$("#score > p:nth-child(2)").html("");
disableButtons ();
simon.delay = 400;
simon.onSound = 0;
simon.gameOver = true;
simon.playArray = [1,2,3,4,3,2,1,2,3,4,3,2,1,2,3,4,3,2,1,2,3,4];
setTimeout(playSounds, 100);
}

function handleAddButton() { 
var random = Math.floor((Math.random() * 4) + 1);
simon.playArray.push(random);
simon.onSound = 0;
simon.score++;
$("#score > p:nth-child(1)").html(simon.score);
setTimeout(playSounds, simon.pause);
}

function handleWrongButton () {
$("#redArea").fadeOut(200);
$("#blueArea").fadeOut(200);
$("#yellowArea").fadeOut(200);
$("#greenArea").fadeOut(200);
$("#redArea").fadeIn(600);
$("#blueArea").fadeIn(600);
$("#yellowArea").fadeIn(600);
$("#greenArea").fadeIn(600);
simon.onSound = 0;
$("#score > p:nth-child(1)").html("!!");
$("#score > p:nth-child(2)").html("WRONG");
if (simon.mode === "Hard") {
simon.score = 0;
simon.onSound = 0;
simon.playArray = [];
simon.playArray.push(Math.floor((Math.random() * 4) + 1));
}
setTimeout(playSounds, simon.pause);
}

function playGreen() {
document.getElementById('greenAudio').play();
$("#greenArea").fadeOut(200);
$("#greenArea").fadeIn(600);
}

function playRed() {
document.getElementById('redAudio').play();
$("#redArea").fadeOut(200);
$("#redArea").fadeIn(600);
}

function playYellow() {
document.getElementById('yellowAudio').play();
$("#yellowArea").fadeOut(200);
$("#yellowArea").fadeIn(800);
}

function playBlue() {
document.getElementById('blueAudio').play();
$("#blueArea").fadeOut(200);
$("#blueArea").fadeIn(600);
}

function playSounds() {
const RED = 1;
const BLUE = 2;
const YELLOW = 3;
const GREEN = 4;
var sound = "";
disableButtons();
for (var i = 0; i < simon.playArray.length; i++) {
sound = simon.playArray[i];
if (sound === RED) {
setTimeout(playRed, simon.delay*(i+1));
} else if (sound === BLUE) {
setTimeout(playBlue, simon.delay*(i+1));
} else if (sound === YELLOW) {
setTimeout(playYellow, simon.delay*(i+1));
} else if (sound === GREEN) {
setTimeout(playGreen, simon.delay*(i+1));
}
}
setTimeout(enableButtons, simon.delay*simon.playArray.length);
}

function disableButtons () {
simon.buttonsEnabled = false;
$(".soundButton").css('cursor','default');
}

function enableButtons () {
if (simon.gameOver) {
return;
}
simon.buttonsEnabled = true;
if (simon.score === 0) {
$("#score > p:nth-child(1)").html("00");
} else {
$("#score > p:nth-child(1)").html(simon.score);
}
if (simon.mode === "Easy") {
$("#score > p:nth-child(2)").html("EASY");
} else {
$("#score > p:nth-child(2)").html("HARD");
}
$(".soundButton").css('cursor','pointer');
}