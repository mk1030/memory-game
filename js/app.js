$(document).ready(function() {

  let cards = $(".cards").children();

  let openCards = [];

  let matchCards = [];

  let m = 0;

  const deck = document.querySelector(".cards");

  let len;

  let moves = [];

  let totalmoves;

  var second = 0;
  var minute = 0;
  var timer = $(".timer");
  var interval;


  function startTimer() {
    interval = setInterval(function() {
      timer.text(minute + " mins " + second + " secs");
      second++;
      if (second == 60) {
        minute++;
        second = 0;
      }
      if (minute == 60) {
        hour++;
        minute = 0;
      }
      // 1000 milliseconds = 1 second
    }, 1000);


  }

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

  $(".restart").click(function() {
    window.location.reload();
  });


  function playGame() {
    $(cards).each(function(i) {

      //add a click function to each card
      $(cards[i]).click(function() {
        if (minute || second || hour > 0 ) {
          console.log("its been clicked");
        }

        else {
          startTimer();
        }
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
              $(this).dequeue();

            });

            $(openCards[1]).addClass("eval").delay(1000).queue(function() {
              $(this).removeClass("eval open disabled").find("i").hide();
              $(this).dequeue();

            });

            //Then we are going to empty out the array

            openCards = [];

            //cards match
          } else if (card1 === card2) {
            matchCards.push($(this));

            $(openCards[0]).addClass("eval").delay(1000).queue(function() {
              $(this).removeClass("eval").dequeue();
              $(this).dequeue();

            });

            $(openCards[1]).addClass("eval").delay(1000).queue(function() {
              $(this).removeClass("eval").dequeue();
              $(this).dequeue();

            });

            // Empty out array again
            openCards = [];

            if (matchCards.length === 8) {
              clearInterval(interval);

              var countstars = $(".stars li:visible").length;
              $("#dialog").append(moves.length + " moves " + countstars + " stars");

              $("#dialog").dialog({
                dialogClass: "no-close",
                modal: true,
                buttons: [{
                  text: "Play Again",
                  click: function() {
                    $(this).dialog("close");
                    window.location.reload();
                  }
                }]
              });
            }
          }


          if (moves.length <= 20) {
            $(".moves").text(moves.length + " Moves");

          } else if (moves.length > 20 && moves.length <= 40) {
            $(".moves").text(moves.length + " Moves");
            $('.stars li:nth-child(3)').hide();
            var countstars = $(".stars li:visible").length;


          } else if (moves.length > 40 && moves.length < 100) {
            $(".moves").text(moves.length + " Moves");

            $('.stars li:nth-child(2), .stars li:nth-child(3)').hide();

            var countstars = $(".stars li:visible").length;



          }


        }


      });





    });
  }


  startGame();
  playGame();
  startTimer();


});

