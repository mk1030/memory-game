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
      $(this).toggleClass("open disabled").find("i").toggle();

      var open = $(this).hasClass( "open" );

      if (open) {
        openCards.push($(this));
      }

    // .find("i").attr("class").slice(3)

      len = openCards.length

      if(len ===2) {
         $.each(openCards, function(index, value) {

          var card1 =  openCards[0].find("i").attr("class").slice(3);
          var card2 =  openCards[1].find("i").attr("class").slice(3);


          if (card1 != card2) {
            console.log("not a match!")
          $(openCards[0]).addClass("eval").removeClass("disabled");
          $(openCards[1]).addClass("eval").removeClass("disabled");
          
          }

          else {
            console.log("It's a match!");
          }

         });


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
