/**
 * Created by phillip.gillan on 15/09/2016.
 */

(function(window){
    var tombola = window.tombola = window.tombola || {};

})(window);

tombola.card = (function(){

    var ticketOne = new tombola.Ticket(1000, 150, "tableOne", "lineWinnerOne", "twoLineWinnerOne", "houseWinnerOne", "matchedTOne");
    var ticketTwo = new tombola.Ticket(1000, 250, "tableTwo", "lineWinnerTwo", "twoLineWinnerTwo", "houseWinnerTwo", "matchedTTwo" );
    var ticketThree = new tombola.Ticket(1000, 350, "tableThree", "lineWinnerThree", "twoLineWinnerThree", "houseWinnerThree", "matchedTThree");
    var ticketFour = new tombola.Ticket(1000, 450, "tableFour", "lineWinnerFour", "twoLineWinnerFour", "houseWinnerFour", "matchedTFour");
    var ticketFive = new tombola.Ticket (1000, 550, "tableFive", "lineWinnerFive", "twoLineWinnerFive", "houseWinnerFive", "matchedTFive");
    var ticketSix = new tombola.Ticket(1000, 650, "tableSix", "lineWinnerSix", "twoLineWinnerSix", "houseWinnerSix", "matchedTSix");


    var _ticketArray = [ticketOne, ticketTwo, ticketThree, ticketFour, ticketFive, ticketSix];

    var ticketOneGetter = function(){

      return ticketOne;
    };

    var ticketTwoGetter = function(){

        return ticketTwo;
    };

    var ticketThreeGetter = function(){

        return ticketThree;
    };

    var ticketFourGetter = function(){

        return ticketFour;
    };

    var ticketFiveGetter = function(){

        return ticketFive;
    };

    var ticketSixGetter = function(){

        return ticketSix;
    };


    var drawCard = function(){

        _ticketArray.forEach(function(ticket){
            {
                ticket.pullLines();
            }
        });
    };


    var _styleTable = function(table, ticket){

        table.style.position = 'absolute';
        table.style.left = ticket.x + 'px';
        table.style.top = ticket.y + 'px';
        table.style.width = 275 +'px';
    };

    var buildTables = function(){

        _ticketArray.forEach(function(ticket){

            ticket.buildTable();
        });

        var tableOne = document.getElementById("tableOne");
        var tableTwo = document.getElementById("tableTwo");
        var tableThree = document.getElementById("tableThree");
        var tableFour = document.getElementById("tableFour");
        var tableFive = document.getElementById("tableFive");
        var tableSix = document.getElementById("tableSix");

        var tableArray = [tableOne, tableTwo, tableThree, tableFour, tableFive, tableSix];

        tableArray.forEach(function(table) {

            _styleTable(table, _ticketArray[(tableArray.indexOf(table))])
        });
    };

    var countWinners = function(num){

        var count = 0;

        _ticketArray.forEach(function(ticket){
            if (num === 1) {

                if (ticket.lineWinner){

                    count += 1
                }
            }

            if (num === 2){

                if (ticket.twoLineWinner) {

                    count += 1
                }
            }

            if (num === 3){

                if (ticket.houseWinner) {

                    count += 1
                }
            }
        });

        //console.log(count);

        return count
    };

    var displayMessage = function(iD){

        var temp = document.getElementById(iD);
        temp.style.visibility = 'visible';
        setTimeout(function(){

            temp.style.visibility = 'hidden';
        }, 7000);

    };

    function div(x, y){

        return (x / y);
    }

    function calc(binary, unary, x, y){

        return binary(x, unary(y));
    }

    var checkBet = function(num){

        var winTotal = 0;
        var bet = 30;
        var temp = document.getElementById('youWin');

        bet = (30*num);


        _ticketArray.forEach(function(ticket){
            if (num === 1){
                if (ticket.bet && ticket.lineWinner) {

                    winTotal = calc(div, countWinners, bet, 1);
                    tombola.gameController.setWallet(winTotal);
                    temp.innerHTML = "You Win: " + winTotal + " Space Bucks";
                    displayMessage("youWin");
                }
            }
            if (num === 2){
                if (ticket.bet && ticket.twoLineWinner) {

                    winTotal = calc(div, countWinners, bet, 2);
                    tombola.gameController.setWallet(winTotal);
                    temp.innerHTML = "You Win: " + winTotal + " Space Bucks";
                    displayMessage("youWin");
                }
            }
            if (num === 3){
                if (ticket.bet && ticket.houseWinner) {

                    winTotal = calc(div, countWinners, bet, 3);
                    tombola.gameController.setWallet(winTotal);
                    temp.innerHTML = "You Win: " + winTotal + " Space Bucks";
                    displayMessage("youWin");
                }
            }
        });
    };

    var reset = function(){

        _ticketArray.forEach(function(ticket){
            ticket.reset();
        });
    };

    var update = function(){

        _ticketArray.forEach(function(ticket){

            ticket.update();
            ticket.left = tombola.gamePhase.toGo(ticket.matchedOne, ticket.matchedTwo, ticket.matchedThree, ticket);
            ticket.updateScreenText();
        })
    };

    var draw = function(){

        _ticketArray.forEach(function(ticket){

            document.getElementById(ticket.matchedID).innerHTML = "To Go: " + ticket.left.toString();
        });
    };


    return{

        ticketOneGetter : ticketOneGetter,
        ticketTwoGetter : ticketTwoGetter,
        ticketThreeGetter : ticketThreeGetter,
        ticketFourGetter : ticketFourGetter,
        ticketFiveGetter : ticketFiveGetter,
        ticketSixGetter : ticketSixGetter,
        drawCard : drawCard,
        buildTables : buildTables,
        checkBet : checkBet,
        update : update,
        reset : reset,
        draw : draw
    };
}());