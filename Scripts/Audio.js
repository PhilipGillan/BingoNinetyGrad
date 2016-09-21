/**
 * Created by phillip.gillan on 01/09/2016.
 */

(function(window){
    var tombola = window.tombola = window.tombola || {};

})(window);

// Audio would not play through this class but would through the HTML file super annoying.
tombola.audio = (function(){

    function playAudio(audioID, volume){

        var soundFX = document.getElementById(audioID);
        soundFX.load();
        soundFX.autoplay = false;
        soundFX.volume = volume;

        if(!soundFX.paused){

            soundFX.pause();
            soundFX.currentTime = 0;
            soundFX.play();
        }
        else {

            soundFX.currentTime = 0;
            soundFX.play();
        }
    }

    function playBallDrawSound(){

        !tombola.gamePhase.gameOverGet() ? playAudio("ballDraw", 0.08) : playAudio("CantDraw", 0.12);
    }

    function setBackground(){

        document.getElementById("snoopJam").pause();
        document.getElementById("bgdMusic").pause();

        !tombola.gamePhase.gameOverGet() ? playAudio("bgdMusic", 0.08) : playAudio("snoopJam", 0.12);
    }

    setBackground();

    return{

        playBallDrawSound : playBallDrawSound,
        playAudio : playAudio,
        setBackground : setBackground
    };

}());