

var jsonData = {};


function showData() {
    console.log("Inserting all previous MySql Data into Table");
    AJAXHandler("", "/showData");

}



function AJAXHandler(query, appRoute)
{

    console.log("AJAXHandler check");
    var req = new XMLHttpRequest();


    // Send the GET request with the query string to the specified route
    req.open("GET", "http://52.34.117.11:8080" + appRoute + "?" + query, true);
    console.log(appRoute);
    console.log(query);

    // AJAX event listener:
    req.addEventListener('load', function () {

            if (req.responseText) {
                jsonData = JSON.parse(req.responseText);
            } else {
                console.log("ERROR. JSON DATA MISSING");
            }

            //Boilerplate stuff. If we get a good response. Display the data
            if (req.status >= 200 && req.status < 400) {
                console.log(jsonData);
                displayTable(jsonData);

            }


    });

    req.send(null);

}


function tableBuilder(tableID, jsonData)
{
    console.log("Hi. TableBuilder called");

    var data = JSON.parse(jsonData);

    //Create Table Sections and append to table ID
    var start = document.getElementById(tableID);
    var table = document.createElement("table");
    start.appendChild(table);

    //Head
    var head = document.createElement("thead");
    table.appendChild(head);

    //Head Rows
    var TR = document.createElement("tr");
    head.appendChild(TR);

    var trElement1 = document.createElement("th");
    var trElement2 = document.createElement("th");
    var trElement3 = document.createElement("th");
    var trElement4 = document.createElement("th");
    var trElement5 = document.createElement("th");


    trElement1.textContent = "Name";
    trElement2.textContent = "Number of Reps";
    trElement3.textContent = "Weight Value";
    trElement4.textContent = "Date";
    trElement5.textContent = "Kg or lbs";

    TR.appendChild(trElement1);
    TR.appendChild(trElement2);
    TR.appendChild(trElement3);
    TR.appendChild(trElement4);
    TR.appendChild(trElement5);


    //Table Body
    var body = document.createElement("tbody");
    table.appendChild(body);


    /***
     * Since Edit and Delete need to be dynamic for each row, we make cells for them
     * which contain the buttons with the appropriately attached functions
     */

    var deleteTH = document.createElement("th");
    var editTH = document.createElement("th");

    deleteTH.textContent = "Delete Row";
    editTH.textContent = "Edit Row";

    TR.appendChild(deleteTH);
    TR.appendChild(editTH);

    //Create Cells for all Available Data then add both buttons
    for (var i = 0; i < data.length;i++)
    {
        var bodyData = data[i];
        var row = document.createElement("tr");


        for (var p in bodyData)
        {
            //var cell = document.createElement("td");
            //create cell within this conditional statement or else you end up with a cell for ID which we dont need to show
            if (p != "id")
            {
                var cell = document.createElement("td");

                if(p == "date")
                    cell.textContent = bodyData[p];
                else if (p == "lbs")
                    cell.textContent = (bodyData[p] == 1) ? "lbs" : "kg";
                else
                    cell.textContent = bodyData[p];

                row.appendChild(cell);
            }


        }
        //Delete button attributes added
        var deleteTD = document.createElement("td");
        var deleteButton = document.createElement("input");
        //console.log(bodyData["id"]);
        deleteButton.setAttribute("id", bodyData["id"]);
        deleteButton.setAttribute("type" , "submit");
        deleteButton.setAttribute("value", "Delete");
        deleteTD.appendChild(deleteButton);

        /**TEST PURPOSES. FUNCTION MOVED ELSEWHERE
        function deleteEvent(deleteButton)
        {
            deleteButton.addEventListener('click', function (event) {
                event.preventDefault();
                var queryData = "id=" + bodyData["id"];
                console.log(queryData);

                AJAXHandler(queryData, "/delete")
            });

        }
         ***/
        deleteEvent(deleteButton,bodyData["id"]);

        row.appendChild(deleteTD);


        //Edit button attributed added
        var editTD = document.createElement("td");
        var editButton = document.createElement("input");
        editButton.setAttribute("id", bodyData["id"]);
        editButton.setAttribute("type", "submit");
        editButton.setAttribute("value", "Edit");
        editTD.appendChild(editButton);



        editEvent(editButton,bodyData["id"],bodyData);



        row.appendChild(editTD);
        body.appendChild(row);
        table.setAttribute("align","center");



    }


}




function displayTable(jsonData)
{
    //delete old table. Loop through elements
    console.log("displayTable check");

    var removeStart = document.getElementById("tableStart");
    while (removeStart.firstChild)
        removeStart.removeChild(removeStart.firstChild);

    //build new table
    tableBuilder("tableStart", jsonData);


}


function submitButtonSetUp()
{
    //var submitButton = document.getElementById("submitExercise");
    console.log("Hi from SubmitButton");

    document.getElementById("submitExercise").addEventListener('click', function(event)
    {
        event.preventDefault();



    //Set up the query string that will be passed to url
    var queryData = "name=" + document.getElementById("exerciseN").value + "&reps=" + document.getElementById("reps").value +
        "&weight=" + document.getElementById("weightNum").value + "&date=" + document.getElementById("dateVal").value +
        "&lbs=" + document.getElementById("lbsInsert").value;


    AJAXHandler(queryData, "/insertData");

    });
}

function updateButton()
{
    console.log("Update button check");

    document.getElementById("updateExercise").addEventListener('click', function(event)
    {
        event.preventDefault();

        var queryData = "name=" + document.getElementById("exerciseN2").value + "&reps=" + document.getElementById("reps2").value +
            "&weight=" + document.getElementById("weightNum2").value + "&date=" + document.getElementById("dateVal2").value +
            "&lbs=" + document.getElementById("lbsInsert2").value + "&id=" + document.getElementById("ID2").value;


        document.getElementById("editForm").style.display = "none";

        AJAXHandler(queryData, "/update2");

    });




}

function deleteEvent(deleButton,delID)
{
    deleButton.addEventListener('click', function (event) {
        event.preventDefault();
        var queryData = "id=" + delID;
        console.log(queryData);

        AJAXHandler(queryData, "/delete")
    });

}

function editEvent(edButton, edID, data)
{
    edButton.addEventListener('click', function(event){
        event.preventDefault();

        document.getElementById("editForm").style.display = "block";

        document.getElementById("ID2").value = data["id"];
        document.getElementById("exerciseN2").value = data["name"];
        document.getElementById("reps2").value = data["reps"];
        document.getElementById("weightNum2").value = data["weight"];
        document.getElementById("dateVal2").value = data["date"];
        document.getElementById("lbsInsert2").value = data["lbs"];



    })



}




document.addEventListener('DOMContentLoaded',function(){
    submitButtonSetUp();
    updateButton();
});
window.onload = showData;


