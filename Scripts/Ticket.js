/**
 * Created by phillip.gillan on 23/08/2016.
 */

(function(window){
    var tombola = window.tombola = window.tombola || {};

})(window);


tombola.Ticket = function(posX, posY, tableID, lineWinnerID, twoLineWinnerID, houseWinnerID, matchedID){

    this.x = posX;
    this.y = posY;

    this.tableID = tableID;

    this.lineOne = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.lineTwo = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.lineThree = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.lineArray = [this.lineOne, this.lineTwo, this.lineThree];

    this.matchedOne = 0;
    this.matchedTwo = 0;
    this.matchedThree = 0;
    this.matchedID = matchedID;

    this.lineWinnerID = lineWinnerID;
    this.twoLineWinnerID = twoLineWinnerID;
    this.houseWinnerID = houseWinnerID;


    this.left = 5;
    this.lineWinner = false;
    this.twoLineWinner = false;
    //house winner was going to be used to allow bets on which ticket will win
    this.houseWinner = false;
    this.lineText = "";
    this.twoLineText = "";
    this.houseText = "";

    this.bagOne = [1,2,3,4,5,6,7,8,9,10];
    this.bagTwo = [11,12,13,14,15,16,17,18,19,20];
    this.bagThree = [21,22,23,24,25,26,27,28,29,30];
    this.bagFour =[31,32,33,34,35,36,37,38,39,40];
    this.bagFive = [41,42,43,44,45,46,47,48,49,50];
    this.bagSix = [51,52,53,54,55,56,57,58,59,60];
    this.bagSeven = [61,62,63,64,65,66,67,68,69,70];
    this.bagEight = [71,72,73,74,75,76,77,78,79,80];
    this.bagNine = [81,82,83,84,85,86,87,88,89,90];

    this.bet = false;

    this.bagArray = [this.bagOne, this.bagTwo, this.bagThree, this.bagFour, this.bagFive, this.bagSix, this.bagSeven, this.bagEight, this.bagNine]

};

tombola.Ticket.prototype = function(){

    var i = 0;
    var k = 0;
    var j = 0;

    var _shuffleBags = function(){

        this.bagArray.forEach(function(bag){

            tombola.randomiser.shuffle(bag);
        });
    };


    var _pullLines = function(line, pos){

        var bagChooser = [this.bagOne, this.bagTwo, this.bagThree, this.bagFour, this.bagFive, this.bagSix,
            this.bagSeven, this.bagEight, this.bagNine];

        tombola.randomiser.shuffle(bagChooser);

        for (i = 0; i < 5; i +=1){

            var tempBag = bagChooser[i];
            var posInArray = Math.floor((tempBag[pos] - 0.5) / 10);
            line[posInArray] = tempBag[pos];
        }

            return line;
    };

     var pullLines = function(){

         _shuffleBags.call(this);
         this.lineOne = _pullLines.call(this, this.lineOne, 0);
         this.lineTwo = _pullLines.call(this, this.lineTwo, 1);
         this.lineThree = _pullLines.call(this, this.lineThree, 2);
         //console.log(this.lineOne);
     };

    var buildTable = function(){

        var table = document.createElement('table');
        table.setAttribute('id', this.tableID);
        var tableBody = document.createElement('tbody');

        this.lineArray.forEach(function(rowData){

            var row = document.createElement('tr');

            rowData.forEach(function(cellData){

                var cell = document.createElement('td');
                if (cellData === 0)
                {
                    cell.appendChild(document.createTextNode(""));
                    cell.style.background = ("#d3d3d3");
                    row.appendChild(cell);
                }

                else {
                    cell.appendChild(document.createTextNode(cellData));
                    cell.style.background = ("white");
                    row.appendChild(cell);
                }
            });

            tableBody.appendChild(row);
        });

        table.appendChild(tableBody);
        document.body.appendChild(table);
    };

    var _updateTable = function(lineArray, tableID){

        lineArray.forEach(function(line){

            var temp = document.getElementById(tableID).rows[lineArray.indexOf(line)].cells;

            for (k = 0; k < line.length; k += 1) {

                if (line[k] === 0) {
                    temp[k].style.background = ("#d3d3d3");
                    temp[k].innerHTML = "";
                }

                else if (line[k] > 99) {
                    temp[k].innerHTML = line[k] / 100;
                    temp[k].style.background = (tombola.randomiser.markedColourGet());
                }
                else {
                    temp[k].innerHTML = line[k];
                    temp[k].style.background = ("White")
                }
            }
        });
    };

    var betGetter = function(){

        return this.bet;
    };

    var betSetter = function(value){

        this.bet = value;
    };

    var updateTable = function(){

        _updateTable.call(this, [this.lineOne, this.lineTwo, this.lineThree], this.tableID);
    };

    var _checkLines = function(line, matched){

        var toCheck = tombola.bingoDraw.currentNumberGetter();

        for (j = 0; j < line.length; j += 1) {

            if (line[j] === toCheck) {
                line[j] = line[j] * 100;
                matched += 1;
            }
        }
        return matched;
    };


    var updateScreenText = function(){

        document.getElementById(this.lineWinnerID).innerHTML = this.lineText;
        document.getElementById(this.twoLineWinnerID).innerHTML = this.twoLineText;
        document.getElementById(this.houseWinnerID).innerHTML = this.houseText;
    };

    var update = function(){

        this.matchedOne = _checkLines.call(this, this.lineOne, this.matchedOne);
        this.matchedTwo = _checkLines.call(this, this.lineTwo, this.matchedTwo);
        this.matchedThree = _checkLines.call(this, this.lineThree, this.matchedThree);
        _updateTable.call(this, [this.lineOne, this.lineTwo, this.lineThree], this.tableID);
        updateScreenText.call(this)
    };

    var reset = function(){

        this.lineOne = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.lineTwo = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.lineThree = [0, 0, 0, 0, 0, 0, 0, 0, 0];

        this.matchedOne = 0;
        this.matchedTwo = 0;
        this.matchedThree = 0;

        this.lineText = "";
        this.twoLineText = "";
        this.houseText = "";
        this.lineWinner = false;
        this.twoLineWinner = false;
        this.houseWinner = false;
        this.left = 5;

        this.bet = false;

        document.getElementById(this.lineWinnerID).innerHTML = this.lineText;
        document.getElementById(this.twoLineWinnerID).innerHTML = this.twoLineText;
        document.getElementById(this.houseWinnerID).innerHTML = this.houseText;
    };

    return{
        pullLines : pullLines,
        buildTable : buildTable,
        betGetter : betGetter,
        betSetter : betSetter,
        updateTable : updateTable,
        update : update,
        updateScreenText : updateScreenText,
        reset : reset

     };
}();