const rulesBtn = document.querySelector(".rules button");
const rulesBg = document.querySelector(".rules-background");
const closeBtn = document.body.clientWidth >= 768 ? document.querySelector(".close-rules-desktop") : document.querySelector(".close-rules-mobile");
let score = document.querySelector(".score-num");
const onePlus = document.querySelector(".game-score .plus");
const pieces = document.querySelectorAll(".step-one .piece");
const stepOne = document.querySelector(".step-one");
const stepTwo = document.querySelector(".step-two");
const user = document.querySelector(".user");
const house = document.querySelector(".house");
let userChoice, houseChoise;
const playAgain = document.querySelector(".play-again");
const resultMsg = document.querySelector(".result");
const userSelection = stepTwo.children[0].firstElementChild;
const houseSelection = stepTwo.children[1].firstElementChild;
const winAudio = document.getElementById("win");
const loseAudio = document.getElementById("lose");
const drawAudio = document.getElementById("draw");
const choseAudio = document.getElementById("chose");
const arrayOfPieces = ["paper", "scissor", "rock"]

let ScoreData = localStorage.getItem("score") || 0;
!ScoreData && localStorage.setItem("score", 0);
score.textContent = ScoreData 

rulesBtn.addEventListener("click", () => {
    rulesBg.classList.add("show");
    setTimeout(() => rulesBg.children[0].style.transform = "translate(-50%, -50%) scale(1)", 200);
})
closeBtn.addEventListener("click", () => {
    rulesBg.children[0].style.transform = "translate(-50%, -50%) scale(0)";
    setTimeout(() => rulesBg.classList.remove("show"), 500);
})

function scoreIncrement() {
    onePlus.style.animation = "IncrementScore 2s";
    score.textContent = +score.textContent + 1;
    localStorage.setItem("score", score.textContent)

}

pieces.forEach(piece => {
    piece.addEventListener("click", (e) => {

        setTimeout(() => {
            stepOne.style.opacity = 0;
            setTimeout(() => {
                stepOne.style.display = "none";
                stepTwo.style.display = "flex";
                stepTwo.style.opacity = 1;
            }, 800);
        }, 1500);

        userChoice = e.target.classList.contains("piece") ? e.target.classList[1] : e.target.parentElement.classList[1];

        houseChoise = randomPiece();
        appendingPiece(userChoice, userSelection);
        
        appendingPiece(houseChoise, houseSelection);

        transitionAnimation(0, "none");

        choseAudio.play();

    })
})

function randomPiece() {
    let randomNum = Math.floor(Math.random() * arrayOfPieces.length);
    return arrayOfPieces[randomNum];
}

function appendingPiece(choice, place) {

    let piece = document.createElement("div");
    piece.className = `piece ${choice}`;
    
    let img = document.createElement("img");
    img.src = `IMG/icon-${choice}.svg`;
    img.alt = choice;
    piece.append(img);

    if (place.parentElement.classList.value === "user") {
        place.append(piece)
    } else {
        setTimeout(() => {
            place.append(piece); 
            setTimeout(() => resultMsg.style.opacity = "1", 800);
            resultMsg.firstElementChild.innerHTML = result()
        }, 3000);
    }
}

function result() {

    let result = "Draw";

    switch (userChoice) {
        case "paper": 
            if (houseChoise === "scissor") {
                result  = "You lose";
            } else if (houseChoise === "rock") {
                result  = "You Win";
            }
        break;
        case "scissor":
            if (houseChoise === "paper") {
                result  = "You Win";
            } else if (houseChoise === "rock") {
                result  = "You lose";
            }
        break;
        case "rock": 
            if (houseChoise === "paper") {
                result  = "You lose";
            } else if (houseChoise === "scissor") {
                result  = "You Win";
            }
        break;
    }

    if (result === "You Win") {
        scoreIncrement();
        winAudio.play();
        activeWinnerAnimation(user);
    } else if (result === "You lose") {
        loseAudio.play();
        activeWinnerAnimation(house);
    } else {
        drawAudio.play();
    }

    return result;
}

playAgain.addEventListener("click", () => {
    resetGame();
})

function activeWinnerAnimation(winner) {
    winner.classList.add("winner");
}

function transitionAnimation(pieceOp, backgroundImg) {
    let pieces = arrayOfPieces.filter(piece => piece !== userChoice);
    pieces.forEach(piece => {
        document.querySelector(`.${piece}`).style.opacity = pieceOp;
    })
    stepOne.style.backgroundImage = backgroundImg;
    pieceOp ? document.querySelector(`.${userChoice}`).classList.remove('chosen') 
    : document.querySelector(`.${userChoice}`).classList.add('chosen');
}

function resetGame() {

    stepTwo.style.opacity = 0;
    setTimeout(() => {
        stepTwo.style.display = "none";
        stepOne.style.display = "flex";
        stepOne.style.opacity = 1;
    }, 800);
    userSelection.innerHTML = "";
    houseSelection.innerHTML = "";
    resultMsg.style.opacity = "0";
    onePlus.style.animation = "none";
    const winner = document.querySelector(".winner");
    winner?.classList.remove("winner");
    transitionAnimation(1, "url(IMG/bg-triangle.svg)")
    userChoice = "";
    houseChoise = "";

}