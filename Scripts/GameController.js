/**
 * Created by phillip.gillan on 08/09/2016.
 */

(function(window){
    var tombola = window.tombola = window.tombola || {};

})(window);

tombola.gameController = (function(){

    var wallet = 1000;
    var _betPlaced = false;
    var _pressed = false;

    var _drawWallet = function(){

        document.getElementById("wallet").innerHTML = "Wallet: " + wallet.toString() + " Space Bucks";
    };

    _drawWallet();

    var getWallet = function(){

        return wallet;
    };

    var setWallet = function(value){

        wallet += value
    };

    var update = function (){

        tombola.card.update();
        tombola.gamePhase.changePhase();
        tombola.card.draw();
        _drawWallet();
    };

    var drawButtonScript = function(){

        tombola.audio.playBallDrawSound();

        if (!tombola.gamePhase.gameOverGet())
        {

            tombola.bingoDraw.nextNumber();
            update();
        }
    };

    var newGameButtonScript = function(){

        tombola.gamePhase.reset();
        tombola.card.drawCard();
        update();
        tombola.audio.playAudio("ballDraw", 0.08);
        _betPlaced = false;
    };

    var randColourButtonScript = function(){

        tombola.randomiser.randomiseMarkedColour();
        update();
        tombola.audio.playAudio("ballDraw", 0.08);
    };

    var betButtonScript = function(ticket){

        if (wallet >=30 && (_pressed === false)) {

            wallet -= 30;
            newGameButtonScript();
            ticket.bet = true;
            _pressed = true;
            setTimeout(function(){

                _pressed = false;
            }, 1000);
        }
        else{
            tombola.audio.playAudio("CantDraw", 0.08);
        }
    };

    return{

        update : update,
        randColourButtonScript : randColourButtonScript,
        drawButtonScript : drawButtonScript,
        newGameButtonScript : newGameButtonScript,
        betButtonScript : betButtonScript,
        getWallet : getWallet,
        setWallet : setWallet
    };
}());