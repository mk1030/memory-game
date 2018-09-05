$(document).ready(function() {



  let cards = $(".cards").children();

  let openCards = [];

  let matchCards = [];

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


//make cards into an array
cards = $.makeArray(cards);

  function startGame() {
    var shuffledCards = shuffle(cards);

    $(shuffledCards).each(function(index, value) {
      deck.append(value);

    });

  }


    $( ".restart" ).click(function() {
      window.location.reload();
    });




  startGame();

  //for (var i = 0; i < cards.length; i++) {

$(cards).each(function(i) {


    //add a click function to each card
    $(cards[i]).click(function() {


    //on click, open the card make it so it's not clickable and show the icon
   $(this).toggleClass("open disabled").find("i").toggle();

      //if a card has the open array, then push it to the OpenCards array
      var open = $(this).hasClass("open");

      if (open) {
        openCards.push($(this));
      }


      //use this to calculate the length of the OpenCards array, so that it can be used to do calculations below:
      len = openCards.length



      //if one card open
      if (len <= 1) {
        console.log(openCards);

      }



    //if two cards are open
      else if (len === 2) {
      console.log(openCards);

          var card1 = openCards[0].find("i").attr("class").slice(3);
          var card2 = openCards[1].find("i").attr("class").slice(3);

          //cards don't match
          if (card1 != card2) {

            //we are going to make it red for a few seconds, and then we are going to:
            //remove the red color
            //close the cards cdfsdf
            //and make it so you can click it again

            $(openCards[0]).addClass("eval").delay(1000).queue(function() {
              $(this).removeClass("eval open disabled").find("i").hide();
              $( this ).dequeue();

            });

            $(openCards[1]).addClass("eval").delay(1000).queue(function() {
              $(this).removeClass("eval open disabled").find("i").hide();
              $( this ).dequeue();

            });

            //Then we are going to empty out the array

            openCards = [];

            //cards match
          } else if (card1 === card2) {
            console.log("It's a match!");
            matchCards.push($(this));

            $(openCards[0]).addClass("eval").delay(1000).queue(function() {
              $(this).removeClass("eval").dequeue();
              $( this ).dequeue();

            });

            $(openCards[1]).addClass("eval").delay(1000).queue(function() {
              $(this).removeClass("eval").dequeue();
              $( this ).dequeue();

            });

            // Empty out array again
            openCards = [];

            if (matchCards.length === 8) {
              $( "#dialog" ).dialog({
                dialogClass: "no-close",
                modal: true,
                buttons: [
                  {
                    text: "Play Again",
                    click: function() {
                      $( this ).dialog( "close" );
                            window.location.reload();
                    }
                  }
                ]
              });
            }

          }






      }





    });

  });




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
