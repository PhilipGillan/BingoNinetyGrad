/**
 * Created by phillip.gillan on 02/09/2016.
 */
(function(window){
    var tombola = window.tombola = window.tombola || {};

})(window);

tombola.gamePhase = (function(){

    var _linesCompleted = false;
    var _twoLinesCompleted = false;
    var gameOver = false;
    var _unpaid = true;



    function triMath(mathFunc, x, y, z){

        return mathFunc(x, y, z);
    }

    function addThree(x, y, z){

        return (x + y + z);
    }

    // var checkHouse = function(){
    //
    //
    // }

    var changePhase = function() {
        if (!_linesCompleted) {
            if (tombola.card.ticketOneGetter().lineWinner || tombola.card.ticketTwoGetter().lineWinner ||
                tombola.card.ticketThreeGetter().lineWinner || tombola.card.ticketFourGetter().lineWinner ||
                tombola.card.ticketFiveGetter().lineWinner || tombola.card.ticketSixGetter().lineWinner) {
                _linesCompleted = true;

                tombola.card.checkBet(1);
                tombola.card.update();
                tombola.card.draw();
            }
        }

        else if (!_twoLinesCompleted && _linesCompleted) {
            if (tombola.card.ticketOneGetter().twoLineWinner || tombola.card.ticketTwoGetter().twoLineWinner ||
                tombola.card.ticketThreeGetter().twoLineWinner || tombola.card.ticketFourGetter().twoLineWinner ||
                tombola.card.ticketFiveGetter().twoLineWinner || tombola.card.ticketSixGetter().twoLineWinner) {
                _twoLinesCompleted = true;

                tombola.card.checkBet(2);
                tombola.card.update();
                tombola.card.draw();
            }

        }

        else if (_twoLinesCompleted && _linesCompleted){

         if (tombola.card.ticketOneGetter().houseWinner || tombola.card.ticketTwoGetter().houseWinner ||
              tombola.card.ticketThreeGetter().houseWinner || tombola.card.ticketFourGetter().houseWinner ||
              tombola.card.ticketFiveGetter().houseWinner || tombola.card.ticketSixGetter().houseWinner) {

                if (_unpaid) {

                    tombola.card.checkBet(3);
                    _unpaid = false;
                }

                tombola.card.update();
                tombola.card.draw();
            }
        }
    };

    var toGo = function(toGoOne, toGoTwo, toGoThree, ticket){

        var snoop = document.getElementById("snoop");
        var firework = document.getElementById("firework");
        var snoopBar = document.getElementById("snoopBar");

        if (_linesCompleted === false) {

            var total = (5 - (triMath(Math.max, toGoOne, toGoTwo, toGoThree)));
            if (total === 0)
            {

                ticket.lineWinner = true;
                ticket.lineText = "Line Winner";
            }
        }
        else
        if (_twoLinesCompleted === false && _linesCompleted === true){

            var smallest = triMath(Math.min, toGoOne, toGoTwo, toGoThree);
            total = (10 - ((triMath(addThree, toGoOne, toGoTwo, toGoThree) - smallest)));

            if (total === 0)
            {
                ticket.twoLineWinner = true;
                ticket.twoLineText = "Two lines Winner";

            }
        }
        else
        {

            total = (15 -(triMath(addThree, toGoOne, toGoTwo, toGoThree)));
            if(total === 0) {
                ticket.houseWinner = true;
                ticket.houseText = "House Winner";
                gameOver = true;

                snoop.style.visibility = 'visible';
                firework.style.visibility = 'visible';
                snoopBar.style.visibility = 'visible';
                var snoopJam = document.getElementById("snoopJam");
                if(snoopJam.paused) {
                    tombola.audio.setBackground();
                }
            }
        }
        return total;
    };

    var gameOverGet = function(){

        return gameOver;
    };

    var reset =  function(){

        var snoop = document.getElementById("snoop");
        var firework = document.getElementById("firework");
        var snoopBar = document.getElementById("snoopBar");
        var snoopJam = document.getElementById("snoopJam");

        tombola.card.reset();
        tombola.bingoDraw.resetOrder();

        _linesCompleted = false;
        _twoLinesCompleted = false;
        gameOver = false;

        snoop.style.visibility = 'hidden';
        firework.style.visibility = 'hidden';
        snoopBar.style.visibility = 'hidden';

        _unpaid = true;


        if(!snoopJam.paused) {
            tombola.audio.setBackground();
        }

        tombola.card.draw();
    };


    return{

        changePhase : changePhase,
        gameOverGet : gameOverGet,
        toGo : toGo,
        reset : reset
    };

}());