const timeDisplay = document.querySelector("#timeDisplay");
const startBtn = document.querySelector("#startBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const resetBtn = document.querySelector("#resetBtn");

let startTime = 0;
let elapsedTime = 0;
let currentTime = 0;
let paused = true;
let intervalId;
let hrs = 0;
let mins = 0;
let secs = 0;
let milliseconds = 0;
const tickSound = new Audio("clock.mp3");
let ticking = false;

startBtn.addEventListener("click", () => {
    if(paused){
        paused = false;
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime, 10);
    }
});
pauseBtn.addEventListener("click", () => {
    if(!paused){
        paused = true;
        elapsedTime = Date.now() - startTime;
        clearInterval(intervalId);
        tickSound.pause();
        ticking = false;
    }
});
resetBtn.addEventListener("click", () => {
    paused = true;
    clearInterval(intervalId);
    startTime = 0;
    elapsedTime = 0;
    currentTime = 0;
    hrs = 0;
    mins = 0;
    secs = 0;
    milliseconds = 0;
    timeDisplay.textContent = "00:00:00.000";
    tickSound.pause();
    tickSound.currentTime = 0;
    ticking = false;
});

function updateTime(){
    elapsedTime = Date.now() - startTime;
    milliseconds = Math.floor(elapsedTime % 1000);
    secs = Math.floor((elapsedTime / 1000) % 60);
    mins = Math.floor((elapsedTime / (1000 * 60)) % 60);
    hrs = Math.floor((elapsedTime / (1000 * 60 * 60)) % 60);

    milliseconds = pad(milliseconds);
    secs = pad(secs);
    mins = pad(mins);
    hrs = pad(hrs);

    timeDisplay.textContent = `${hrs}:${mins}:${secs}.${milliseconds}`;
    if (!ticking) {
        tickSound.play();
        ticking = true;
    }
    function pad(unit){
        return (("0") + unit).slice(-2);
    }
}
