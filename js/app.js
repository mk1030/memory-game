$(document).ready(function() {

  let cards = $(".cards").children();

  let openCards = [];

  let matchCards = [];

  let m = 0;

  const deck = document.querySelector(".cards");

  var len;

  var moves = [];

  var totalmoves;

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
      }

    //if two cards are open
      else if (len === 2) {
          m++;
          moves.push(m);
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

              console.log(moves.length);
            $( "#dialog" ).append(moves.length + " moves" );



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



          if ( moves.length <= 10) {
            $( ".moves" ).text(moves.length + " Moves" );

         }
         else if ( moves.length > 10 &&  moves.length <=20) {
            $( ".moves" ).text(moves.length + " Moves" );
          $('.stars li:nth-child(3)').hide();

         }

         else if ( moves.length > 20 &&  moves.length < 100){
            $( ".moves" ).text(moves.length + " Moves" );

          $('.stars li:nth-child(2), .stars li:nth-child(3)').hide();

          }


      }


    });





  });



});
