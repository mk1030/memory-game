//return all cards in a NodeList object
// A nodelist object is a list of nodes extracted from a document.
let cardsNodeList = document.querySelectorAll('.cards li');

let openCards = [];
let matchCards = [];
let m = 0;
const deck = document.querySelector(".cards");
let len;
let moves = [];
let totalmoves;
let second = 0;
let minute = 0;
let hour = 0;
let timer = $(".timer");
let interval;





function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
//make cards into an array
var cards = Array.from(cardsNodeList)
//var cardsArr = Array.prototype.slice.call(cards);

function shuffleCards() {
  var shuffledCards = shuffle(cards);
  $(shuffledCards).each(function(index, value) {
    deck.appendChild(value);
  });
}

var superToggle = function(element, class0, class1) {
  element.classList.toggle(class0);
  element.classList.toggle(class1);
}

function playGame() {
  for (let card of cards) {
    card.addEventListener("click", function() {

//$(this).toggleClass("open disabled").find("i").toggle();
superToggle(this, 'open', 'disabled');
this.classList.toggle('fa');


    });
  }
}



shuffleCards();
playGame();
