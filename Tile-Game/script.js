function start() {

    document.getElementById("start").style.display = "none";

    let game = document.createElement("div");
    game.id = "game";
    document.body.appendChild(game);

    let seconds = 30;
    let clock = document.createElement("p");
    clock.id = "timer";
    game.appendChild(clock);

    let score = 0;
    let currentScore = document.createElement("div");
    let s = document.createTextNode("Score:" + score);
    currentScore.id = "score";
    currentScore.appendChild(s);
    game.appendChild(currentScore);


    let highscore = (localStorage.getItem("highScore")) ? localStorage.getItem("highScore") : 0;
    let rowCount = document.querySelector('#difficulty option:checked').value;
    let colCount = document.querySelector('#difficulty option:checked').value;

    for (let i = 1; i <= rowCount; i++) {
        let row = document.createElement("div");
        row.id = "row";

        for (let j = 1; j <= colCount; j++) {
            let col = document.createElement("div");
            col.className = "tile";
            row.appendChild(col);
        }
        game.appendChild(row);
    }
    let attempts = 0;
    let incorrect = 0;
    let correct = 0;
    let divs = document.querySelectorAll('.tile')

    divs.forEach(function (item) {
        item.addEventListener('mouseup', function (event) {
            ++attempts;
            if (event.target.style.backgroundColor === "black") {
                document.getElementById("score").innerHTML = "Score: " + (++score);
                ++correct
            } else {
                document.getElementById("score").innerHTML = "Score: " + (--score);
                ++incorrect;
            }
        })
    })

    setInterval(function () {
        if (seconds == 0) {
            (score > highscore) ? localStorage.setItem("highScore", score): localStorage.setItem("highScore", highscore)
            let highScore = localStorage.getItem("highScore");
            document.getElementById("game").style.display = "none";
            let stats = document.createElement("p");
            stats.id = "timer";
            let t = document.createTextNode(
                "GAME OVER!!! Final Score: " + " " + score
            );
            stats.appendChild(t);
            document.body.appendChild(stats);

            document.getElementById("highscore").innerHTML =
                "Hi-score: " + highScore;

            document.getElementById("attempts").innerHTML =
                "Clicked: " + attempts;

            document.getElementById("correct").innerHTML =
                "Correct: " + correct;

            document.getElementById("incorrect").innerHTML =
                "Incorrect: " + incorrect;
            document.getElementById("endgame").style.display = "flex";
        }
        document.getElementById("timer").innerHTML = "Time:" + seconds;
        seconds--;



    }, 1000);



    setInterval(() => {
        for (i = 0; i < divs.length; i++) {
            if (divs[i].style.backgroundColor)
                divs[i].style.backgroundColor = '';
        }
        let store = divs[Math.floor(Math.random() * (rowCount * colCount))]
        store.style.background = 'black'


    }, 1000)
}
