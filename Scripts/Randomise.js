/**
 * Created by phillip.gillan on 02/09/2016.
 */
(function(window){
    var tombola = window.tombola = window.tombola || {};

})(window);

//revealing modular pattern 1st attempt

tombola.randomiser = (function(){

    var markedColour = "indianRed";

    var shuffle = function (array){

        var m = array.length, t, i;
        while(m) {

            i = Math.floor(Math.random() * (m -= 1));
            t = array[m];
            array[m] = array[i];
            array[i] = t;
            }
            return array;
    };

    var randomiseMarkedColour = function() {

        var colourArray = ["indianRed", "DeepSkyBlue", "LawnGreen", "Yellow", "Pink", "MediumPurple", "Orange"];
        var colourLen = colourArray.length;
        var colourPos = Math.floor(Math.random() * colourLen);
        markedColour = colourArray[colourPos];
    };

    var markedColourGet = function(){

        return markedColour;
    };

    return{

        shuffle: shuffle,
        randomiseMarkedColour: randomiseMarkedColour,
        markedColourGet : markedColourGet
    };
}());