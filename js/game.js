var grid = document.querySelector(".grid");
var spanPlayer = document.querySelector(".player");
var timer = document.querySelector(".timer")

var characters = [
    "knucles",
    "luigi",
    "mario",
    "megamen",
    "pacmen",
    "princesa-peach",
    "shadow",
    "sonic",
    "tails",
    "yioshi",
];

var createElement = (tag, className) => {
    var element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = "";
let secondCard = "";

var checkEndGame = () => {
    var disabledCards = document.querySelectorAll(".disabled-card");

    if(disabledCards.length === 20) {
        clearInterval(this.loop);
        alert(`Parabens ${spanPlayer.innerHTML} ,seu record foi:  ${timer.innerHTML}`);
    }
}

var checkCards = () => {
     var firstCharacter = firstCard.getAttribute("data-character");
     var secondCharacter = secondCard.getAttribute("data-character");
    
     if (firstCharacter === secondCharacter) {

         firstCard.firstChild.classList.add("disabled-card");
         secondCard.firstChild.classList.add("disabled-card");

         firstCard = "";
         secondCard = "";

         checkEndGame();
     
     } else {
        setTimeout(() => {

            firstCard.classList.remove("reveal-card");
            secondCard.classList.remove("reveal-card");

            firstCard = "";
            secondCard = "";

        }, 500);
     }
}
var revealCard = ({ target }) => {
    if (target.parentNode.className.includes("reveal-card")) {
        return;
    }

    if (firstCard === "") {
        
        target.parentNode.classList.add("reveal-card");
        firstCard = target.parentNode;
   
    }else if (secondCard === "") {

        target.parentNode.classList.add("reveal-card");
        secondCard = target.parentNode;

        checkCards();

    }
   
} 

var createrCard = (character) => {

    var card = createElement("div", "card");
    var front = createElement("div", "face front");
    var back = createElement("div", "face back");

    front.style.backgroundImage = `url("../img/${character}.jpg")`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener("click", revealCard);
    card.setAttribute("data-character", character)

    return card;
}

var loadGame = () => {

    var duplicateCharacters = [ ...characters, ...characters ];
     
    var shuffledArray = duplicateCharacters.sort( () => Math.random() - 0.5 );

    shuffledArray.forEach((character) => {

       var card = createrCard(character);
       grid.appendChild(card);
        
    });
}

/* função*/
function  starTimer () {

    this.loop =setInterval(() =>{

    var correntTime = +timer.innerHTML;
    timer.innerHTML = correntTime + 1;

    }, 1000)
}

/* função*/
window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem("player");
    loadGame();
    starTimer();
}
