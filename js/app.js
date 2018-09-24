$(document).ready(function() {
  //define global variables
  let cards = $(".cards").children();
  let openCards = [];
  let matchCards = [];
  //m keeps track of the moves made throught game play.
  let m = 0;
  const deck = document.querySelector(".cards");
  let len;
  let moves = [];
  let totalmoves;
  let second = 0;
  let minute = 0;
  let hour = 0;
  let timer = $(".timer");

  //This is a function for the timer.
  function startTimer() {
    timer.text((minute > 1 ? minute + ' mins' : minute + ' min') + " " + (second > 1 ? second + ' secs' : second + ' sec'));
    second++;
    if (second == 60) {
      minute++;
      second = 0;
    }
    if (minute == 60) {
      hour++;
      minute = 0;
    }
  };


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

  //shuffle the cards and then append them onto the page. Since there is only one deck on the page, it will replace the existing deck on the page.
  function shuffleCards() {
    var shuffledCards = shuffle(cards);
    $(shuffledCards).each(function(index, value) {
      deck.append(value);
    });
  }

  //reload the page to restart the game -- since these are the only page elements on the page.
  $(".restart").click(function() {
    window.location.reload();
  });

  //function that contains game logic
  function playGame() {
    $(cards).each(function(i) {
      //add a click function to each card
      $(cards[i]).click(function() {

        /* Check to see if the timer is running. If the timer hasn't started yet, then call the startTimer function first, to get the timer to increment one second
        Then after that use the setInterval function to run the timer and set it equal to an id that you can use to stop the function, once
        cards have been matched.   */

        if (minute || second || hour > 0) {} else {
          startTimer();
          intervalID = setInterval(startTimer, 1000);
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
        if (len <= 1) {}
        //if two cards are open
        else if (len === 2) {
          //m keeps track of the moves. 1 move is counted if two cards are opened.
          m++;
          moves.push(m);

          //grab the class name of each card so that we can determine if they match
          var card1 = openCards[0].find("i").attr("class").slice(3);
          var card2 = openCards[1].find("i").attr("class").slice(3);

          //if cards don't match
          if (card1 != card2) {
            //we are going to make it red for a few seconds, and then we are going to:
            //remove the red color
            //close the cards
            //and make it so you can click it again
            $(openCards[0]).addClass("eval").delay(600).queue(function() {
              $(this).removeClass("eval open disabled").find("i").hide();
              $(this).dequeue();
            });
            $(openCards[1]).addClass("eval").delay(600).queue(function() {
              $(this).removeClass("eval open disabled").find("i").hide();
              $(this).dequeue();
            });

            //Then we are going to empty out the array
            openCards = [];

            //cards match
          } else if (card1 === card2) {
            matchCards.push($(this));
            $(openCards[0]).addClass("eval").delay(1000).queue(function() {
              $(this).removeClass("eval");
              $(this).dequeue();
            });
            $(openCards[1]).addClass("eval").delay(1000).queue(function() {
              $(this).removeClass("eval");
              $(this).dequeue();
            });
            // Empty out array again
            openCards = [];

            //what happens when all the cards are matched.
            if (matchCards.length === 8) {
              //stop the timer
              clearInterval(intervalID);

              //count the amount of stars to display in pop-up
              var countstars = $(".stars li:visible").length;

              //used jQuery UI to create a dialog box that serves as a pop-up
              //There is a div in the index.html for #dialog to add it's contents to.
              $("#dialog").append('<br/>' + "<strong>Game Stats:</strong> " + '<br/>' + moves.length + " moves " + '<br/>' + countstars + " stars" + '<br/>' + timer.text());

              //display the pop-up 1 second after the last pair of cards patch! 
              setTimeout(function() {
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
              }, 1000)


            }


          }


          //stars logic, use the moves array to display the amount of stars.
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
  shuffleCards();
  playGame();
});
