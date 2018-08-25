/*
 * Create a list that holds all of your cards
 */

 $( document ).ready(function() {


   // Shuffle function from http://stackoverflow.com/a/2450976
   function shuffle(array) {
       var currentIndex = array.length, temporaryValue, randomIndex;

       while (currentIndex !== 0) {
           randomIndex = Math.floor(Math.random() * currentIndex);
           currentIndex -= 1;
           temporaryValue = array[currentIndex];
           array[currentIndex] = array[randomIndex];
           array[randomIndex] = temporaryValue;
       }

       return array;
   }

//grab the cards this returns an object
let cards = $(".cards").children();


//convert the object into an array, so we can use the built-in methods for array
cards = $.makeArray( cards );


//loop through the cards array. 
//Add a click function to each card that will toggle to "open" the card and will disable it. 
//The i element is initially hidden with CSS, but add a toggle that will make it visible when clicked and invisible when clicked again. 
for (var i = 0; i < cards.length; i++){
  $( cards[i]).click(function() {
   $( this).toggleClass( "open disabled" ).find("i").toggle();
});

};




//get the entire ul html elements
const deck = $(".cards").get(0);
console.log(deck);


function startGame(){
	//get an array of shuffled cards 
   var shuffledCards = shuffle(cards);
  console.log(shuffledCards);
	  //loop through this shuffled card array. In an each loop you must pass the index and value. 
	  //run a function at each index, that will add the value of each index (the li.card) to the deck element. 
	   $.each(shuffledCards, function(item, value) {
		$(deck).append(value)
		  
	  }); 
   
}

startGame();



});

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
// for (var x = 0; x < cards.length; x++){
// }
// .find( "i" ).toggleClass("fa-diamond")

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 
  for (var i= 0; i < shuffledCards.length; i++){
      [].forEach.call(shuffledCards, function(item){
         deck.appendChild(item);
      });
   }
 
 */
