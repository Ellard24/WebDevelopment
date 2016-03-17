/**
 * Created by Ellard on 1/30/2016.
 */


//Set initial coords for table traversal
var xcord = 1;
var ycord = 0;
//Array that holds text content for table cells
var data = ["1 1", "2 1", "3 1", "4 1", "1 2", "2 2", "3 2", "4 2", "1 3", "2 3", "3 3", "4 3", "1 4", "2 4", "3 4", "4 4"];

//Function that creates table
function createTable() {
    var table = document.createElement("table");
    table.id = "table1";

    var headRow = document.createElement("tr");
    for (var i = 1; i < 5; i++){
        var headCell = document.createElement("th");
        headCell.textContent = "Header" + i;
        headRow.appendChild(headCell);
    }
    table.appendChild(headRow);

    var dataCount = 0;

    for(var j = 1; j < 5; j++)
    {
        var row = document.createElement("tr");

        for(var k = 1; k < 5; k++)
        {
            var cell = document.createElement("td");
            cell.textContent = data[dataCount];
            cell.id = dataCount;
            dataCount++;
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    return table;
}


//Function to create buttons
function createButtons(name, id) {
    var button1 = document.createElement("BUTTON");
    button1.textContent = name;
    button1.id = id;
    return button1;

}

//Function for setting background color
function markYellow()
{
    var changeCell = document.getElementById("table1").rows[xcord].cells[ycord];

    changeCell.style.backgroundColor = "yellow";

}



function setCurrent(inputX, inputY)
{

    var changeCell = document.getElementById("table1").rows[inputX].cells[inputY];
    changeCellBorder(changeCell);
}

//This function sets active cell border to show that it is selected
function changeCellBorder(cell){
    cell.style.borderWidth = "thick";
}





function moveUp() {
    if (xcord == 1)
        alert("Can't move up");
    else
    {
        var changeCell = document.getElementById("table1").rows[xcord].cells[ycord];
        changeCell.style.borderWidth = "";  //deletes select effect
        xcord--;
        setCurrent(xcord,ycord);
    }

}


function moveDown()
{
    if (xcord == 4)
        alert("Can't move down");
    else
    {
        var changeCell = document.getElementById("table1").rows[xcord].cells[ycord];
        changeCell.style.borderWidth = "";
        xcord++;
        setCurrent(xcord,ycord);
    }

}



function moveLeft()
{
    if (ycord == 0)
        alert("Cant move left");
    else
    {
        var changeCell = document.getElementById("table1").rows[xcord].cells[ycord];
        changeCell.style.borderWidth = "";
        ycord--;
        setCurrent(xcord,ycord);
    }


}

function moveRight()
{
    if (ycord == 3)
        alert("Cant move right");
    else
    {
        var changeCell = document.getElementById("table1").rows[xcord].cells[ycord];
        changeCell.style.borderWidth = "";
        ycord++;
        setCurrent(xcord,ycord);
    }


}

function startCell(x,y)
{
    setCurrent(x,y);

}




document.body.appendChild(createTable());


//Creates all the buttons and sets their IDs
var buttonName1 = "Up";
var buttonID1 = "up";

document.body.appendChild(createButtons(buttonName1, buttonID1));
var buttonName2 = "Down";
var buttonID2 = "down";

document.body.appendChild(createButtons(buttonName2, buttonID2));
var buttonName3 = "Left";
var buttonID3 = "left";

document.body.appendChild(createButtons(buttonName3, buttonID3));
var buttonName4 = "Right";
var buttonID4 = "right";

document.body.appendChild(createButtons(buttonName4, buttonID4));
document.write('</br>' + '</br>');

var buttonName5 = "Mark Cell";
var buttonID5 = "marker";
document.body.appendChild(createButtons(buttonName5, buttonID5));





//Sets 1,1 to starting cell with border
startCell(xcord,ycord);

// Sets button to change color on press
document.getElementById("marker").addEventListener("click", function(){markYellow(xcord,ycord)});


document.getElementById("up").addEventListener("click", function(){moveUp(xcord,ycord)});
document.getElementById("down").addEventListener("click", function(){moveDown(xcord,ycord)});
document.getElementById("left").addEventListener("click", function(){moveLeft(xcord,ycord)});
document.getElementById("right").addEventListener("click", function(){moveRight(xcord,ycord)});



