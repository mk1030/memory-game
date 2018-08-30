$(document).ready(function() {

  let cards = $(".cards").children();

  cards = $.makeArray(cards);

  openCards = [];

  const deck = document.querySelector(".cards");

  var len;


  // Shuffle function from http://stackoverflow.com/a/2450976
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



  function startGame() {
    var shuffledCards = shuffle(cards);

    $(shuffledCards).each(function(index, value) {
      deck.append(value);

    });

  }


  startGame();


  for (var i = 0; i < cards.length; i++) {
    $(cards[i]).click(function() {


    //on click, open the card make it so it's not clickable and show the icon
   $(this).toggleClass("open disabled").find("i").toggle();

      var open = $(this).hasClass("open");

      if (open) {
        openCards.push($(this));
      }



      len = openCards.length

      if (len <= 1) {
        console.log(openCards);

      }




      else if (len === 2) {
      console.log(openCards);

          var card1 = openCards[0].find("i").attr("class").slice(3);
          var card2 = openCards[1].find("i").attr("class").slice(3);


          if (card1 != card2) {

            //we are going to make it red for a few seconds, and then we are going to:
            //remove the red color
            //close the cards cdfsdf
            //and make it so you can click it again

            $(openCards[0]).addClass("eval").delay(1000).queue(function() {
              $(this).removeClass("eval open disabled").find("i").hide();

            });

            $(openCards[1]).addClass("eval").delay(1000).queue(function() {
              $(this).removeClass("eval open disabled").find("i").hide();

            });

            //Then we are going to empty out the array

            openCards = [];


          } else if (card1 === card2) {
            console.log("It's a match!");


            $(openCards[0]).addClass("eval").delay(1000).queue(function() {
              $(this).removeClass("eval");

            });

            $(openCards[1]).addClass("eval").delay(1000).queue(function() {
              $(this).removeClass("eval");

            });

            openCards = [];

          }






      }





    });

  };






});

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
