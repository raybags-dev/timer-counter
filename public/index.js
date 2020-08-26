let startTimerButton = document.querySelector('.startTimer'),
    pauseTimerButton = document.querySelector('.pauseTimer'),
    timerDisplay = document.querySelector('.timer');

let startTime,
    updatedTime,
    difference,
    tInterval,
    savedTime,

    // On Off simulation
    paused = 0,
    running = 0;

function startTimer() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1);

        // just setting ON or OFF simulation
        paused = 0;
        running = 1;

        timerDisplay.style.background = "#209cff;";
        timerDisplay.style.cursor = "auto";
        timerDisplay.style.color = "white";
        startTimerButton.classList.add('lighter');
        pauseTimerButton.classList.remove('lighter');
        startTimerButton.style.cursor = "auto";
        pauseTimerButton.style.cursor = "pointer";
    }
}

function pauseTimer() {
    if (!difference) {
        // if timer never started, don't allow pause button to do anything
    } else if (!paused) {
        clearInterval(tInterval);
        savedTime = difference;

        paused = 1;
        running = 0;

        timerDisplay.style.background = "#00cdac;";
        timerDisplay.style.color = "#ffb199;";
        timerDisplay.style.cursor = "pointer";
        startTimerButton.classList.remove('lighter');
        pauseTimerButton.classList.add('lighter');
        pauseTimerButton.classList.add('animated flash infinite');

        startTimerButton.style.cursor = "pointer";
        pauseTimerButton.style.cursor = "auto";
    } else {
        // if the timer was already paused, when they click pause again, start the timer again
        startTimer();
    }
}

function resetTimer() {
    clearInterval(tInterval);
    savedTime = 0;
    difference = 0;
    paused = 0;
    running = 0;

    timerDisplay.innerHTML = `Let's count`;
    timerDisplay.style.background = " #00cdac ";
    timerDisplay.style.color = "#fff";
    timerDisplay.style.cursor = "pointer";

    startTimerButton.classList.remove('lighter');
    pauseTimerButton.classList.remove('lighter');

    startTimerButton.style.cursor = "pointer";
    pauseTimerButton.style.cursor = "auto";
}

function getShowTime() {
    updatedTime = new Date().getTime();

    if (savedTime) {
        difference = (updatedTime - startTime) + savedTime;
    } else {
        difference = updatedTime - startTime;
    }
    // var days = Math.floor(difference / (1000 * 60 * 60 * 24));
    var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((difference % (1000 * 60)) / 1000);
    var milliseconds = Math.floor((difference % (1000 * 60)) / 100);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 100) ? (milliseconds < 10) ? "00" + milliseconds : "0" + milliseconds : milliseconds;
    timerDisplay.innerHTML = hours + ':' + minutes + ':' + seconds + ':' + milliseconds;
}