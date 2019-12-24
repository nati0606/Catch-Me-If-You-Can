var scores = [];
var scoresJSON = localStorage.getItem("scores");

if (scoresJSON != null) {
  scores = JSON.parse(scoresJSON);
} 
// else {
  // scores = [
  //  {score: 0, name: "", date: ""},
  //  {score: 0, name: "", date: ""},
  //  {score: 0, name: "", date: ""},
  //  {score: 0, name: "", date: ""},
  //  {score: 0, name: "", date: ""}
  // ]

  // scoresJSON = JSON.stringify(scores);
  // localStorage.setItem("scores", scoresJSON);
// }


var ball = document.getElementById("ball");
var box = document.getElementById("box");
var scoreId = document.getElementById("score");
var pointsId = document.getElementById("points");
var missClicksId = document.getElementById("missClicks");
var levelId = document.getElementById("level");
var timerId = document.getElementById("timer");
var mainDiv = document.getElementById("high_scores");
var toAppend = "";
var score = 0;
var missClicks = 0;
var points = 10;
var level = 1;
var timer = 60;
var speed = 2000;
var time = 300;


createHtmlScores();

function createHtmlScores() {

  var scoresJSON = JSON.stringify(scores);
  localStorage.setItem("scores", scoresJSON);
  toAppend = "";
  scores.forEach(function (score, i) {
    var newDiv =
      `<div class="player ${i}">
            <div class="date"> ${score.date} </div>
            <div class="high_scores col_gr fs_12"> ${score.score}  -  ${score.name} </div>
        </div>`

    toAppend += newDiv;
  });
  mainDiv.innerHTML = toAppend;
}


function play() {

  reset()
  ballOn();
  timerOn();
  ball.addEventListener("click", addPoints)
  box.addEventListener("click", minPoints);
}


function ballOn() {

  ball.style.animationDuration = speed + "ms";
  ball.addEventListener("mouseover", random);
}


function random() {

  setTimeout(function () {

    var randomLeft = Math.floor(Math.random() * 790);
    var randomTop = Math.floor(Math.random() * 420);
    ball.style.top = randomTop + "px";
    ball.style.left = randomLeft + "px";
  }, time);
}


function timerOn() {

  myTimer = setInterval(chrono, 1000);

  function chrono() {

    if (timer != 0) {
      timer -= 1;
      timerId.innerHTML = timer;
    } else {
      clearInterval(myTimer);
      endGame();
    }
  }
}


function endGame() {
  var endScore = score - missClicks;
  alert("Game Over !!\nYours points : " + endScore + ".");

  if (scores.length < 5 || endScore > scores[4].score) {
    enterName(endScore);
  }
}


function enterName(endScore) {
  var name = prompt("Enter your name");
  myDate = new Date();
  theDay = myDate.getDate();
  theMonth = myDate.getMonth() + 1;
  theYear = myDate.getFullYear();
  date = theDay + "/" + theMonth + "/" + theYear;
  // saveScore(endScore, name, date);
  var newScore = new Scores(endScore, name, date);
  if (scores.length == 5) {
    scores.pop();
  }
  scores.push(newScore);
  scores.sort(function (a, b) {
    if (a.score < b.score) {
      return 1;
    }
    if (a.score > b.score) {
      return -1;
    }
    return 0;
  });
  createHtmlScores();
}


function saveScore(endScore, name, date) {
  for (let i = 0; endScore != scores[i].score && i < scores.length; i++) {
    if (endScore > scores[i].score) {
      var newScore = new Scores(endScore, name, date);
      scores.splice(i, 0, newScore);
      scores.pop();
      createHtmlScores();
      break;
    } else if (endScore > scores[i + 1].score) {
      var newScore = new Scores(endScore, name, date);
      scores.splice(i + 1, 0, newScore);
      scores.pop();
      createHtmlScores();
      break;
    }
  }
}


function Scores(_score, _name, _date) {
  this.score = _score;
  this.name = _name;
  this.date = _date;
}


function addPoints(e) {
  e.stopPropagation();
  score += 10 * level;
  scoreId.innerHTML = score;
  points -= 1;
  pointsId.innerHTML = points;
  addLevel();
}


function addLevel() {
  if (points == 0 && level < 5) {
    speed -= 0.25;
    time -= 50;
    timer += 10;
    timerId.innerHTML = timer;
    level += 1;
    levelId.innerHTML = level;
    points = 10;
    pointsId.innerHTML = points;
  } else if (points == 0 && level == 5) {
    points = "--";
    pointsId.innerHTML = points;
  }
}


function minPoints() {
  missClicks += level;
  missClicksId.innerHTML = score - missClicks;
}


function reset() {
  scoreId.innerHTML = 0;
  score = 0;
  pointsId.innerHTML = 10;
  points = 10;
  levelId.innerHTML = 1;
  level = 1;
  missClicksId.innerHTML = 0;
  missClicks = 0;
  timerId.innerHTML = 60;
  timer = 60;
  ball.style.top = "0px";
  ball.style.left = "0px";
}