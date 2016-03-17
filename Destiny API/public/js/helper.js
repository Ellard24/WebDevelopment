/**
 * Created by Ellard on 3/4/2016.
 */

/***
var jsonData = {};

function grimData()
{
    var queryData = document.getElementById("grimValue").value;
    var grimAddress = "http://www.bungie.net/Platform/Destiny/Vanguard/Grimoire/Definition/";
    //var grimHandle = 'grim';





    AJAXHandler(grimAddress, queryData);

}

function AJAXHandler(address, query)
{

    console.log("AJAXHandler check");
    var req = new XMLHttpRequest();


    // Send the GET request with the query string to the specified route
    req.open("GET", address + "?" + query, true);
    req.setRequestHeader("X-API-Key", "cb14aaf41a34454e911aa868b8f0249b");
    console.log(query);

    // AJAX event listener:
    req.addEventListener('load', function () {
        if (req.status >= 200 && req.status < 400) {
            if (req.responseText) {
                jsonData = JSON.parse(req.responseText);
                displayData(jsonData);
            } else {
                console.log("ERROR. JSON DATA MISSING");
            }
        }


    });

    req.send(null);

}

function displayData(data) {
    var anchor = document.getElementById("inputData");
    var list = document.createElement("ul");
    var listData = JSON.parse(data);

    anchor.appendChild(list);



    for (var i = 0; i < listData.length; i++)
    {
        var curData = listData[i];

        for (var key in curData)
        {
            var item = document.createElement("li");

            item.textContent = curData + curData[key];


            list.appendChild(item);

        }



    }

}

function submitSetUp()
{
    document.getElementById("submitGrim").addEventListener('click', function(event){
        event.preventDefault();

        grimData();

    })



}

document.addEventListener("DOMContentLoaded", function(){
    submitSetUp();
});

 **/