/**
 * Created by phillip.gillan on 23/08/2016.
 */

(function(window){
    var tombola = window.tombola = window.tombola || {};

})(window);

tombola.bingoDraw = (function(){

    var _bingoOrder = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,
        39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,
        77,78,79,80,81,82,83,84,85,86,87,88,89,90];
    var _currentNumber = "";
    var _lastNumber = "";
    var _position = 0;

    var randomiseOrder = function(){

        tombola.randomiser.shuffle(_bingoOrder);
    };

    randomiseOrder();

    var nextNumber = function(){

        _lastNumber = _currentNumber;
        _currentNumber = _bingoOrder[_position];
        _position += 1;
        document.getElementById("number").innerHTML = _currentNumber;
        document.getElementById("lastNumber").innerHTML = _lastNumber;
    };

    var resetOrder = function(){

        _currentNumber = "";
        _lastNumber = "";
        _position = 0;
        document.getElementById("number").innerHTML = _currentNumber;
        document.getElementById("lastNumber").innerHTML = _lastNumber;
    };

    var currentNumberGetter = function(){

        return _currentNumber;
    };

    return{

        randomiseOrder : randomiseOrder,
        nextNumber : nextNumber,
        resetOrder : resetOrder,
        currentNumberGetter : currentNumberGetter
    };

}());