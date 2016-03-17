
var apiKey = "28cfefa9265633f6203c41bc91b00180";



document.getElementById("submitCity").addEventListener('click', function(event){
    var req = new XMLHttpRequest();
    var cityName = document.getElementById("city").value;
    if (checkCity(cityName) == false)
        return;
    req.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + ",or&appid=" + apiKey, true);
    req.addEventListener('load',function(){
        if(req.status >= 200 && req.status < 400){
            var response = JSON.parse(req.responseText);
            document.getElementById('cityName').textContent = response.name;

            document.getElementById('descriptionMain').textContent = response.weather[0].main;
            document.getElementById('description').textContent = response.weather[0].description;
            document.getElementById('temperature').textContent = (response.main.temp - 273.15).toFixed(2) + " Celsius";
            document.getElementById('tempMin').textContent = (response.main.temp_min - 273.15).toFixed(2) + " Celsius";
            document.getElementById('tempMax').textContent = (response.main.temp_max - 273.15).toFixed(2) + " Celsius";

            document.getElementById('humidity').textContent = response.main.humidity + "%";
            document.getElementById('windspeed').textContent = response.wind.speed + "mph";
            document.getElementById('pressure').textContent = response.main.pressure;












        } else {
            console.log("Unable to fetch location and weather data");
        }});
    req.send(null);
    //req.send(JSON.stringify(payload));
    event.preventDefault();
});

document.getElementById('jsonSubmit').addEventListener('click', function(event){
    document.getElementById("output1").textContent = "";
    var req2 = new XMLHttpRequest();
    var payload1 = document.getElementById("f1").value;
   // var payload2 = document.getElementById("v1").value;

    req2.open('POST', "http://httpbin.org/post", true);
    req2.setRequestHeader('Content-Type', 'application/json');
    req2.addEventListener('load',function(){
        if(req2.status >= 200 && req2.status < 400){
            var response = JSON.parse(req2.responseText);

            for (var i = 0 ; i < response.data.length;i++)
                document.getElementById("output1").textContent += response.data[i];


        } else {
            console.log("Error");
        }});
    req2.send(JSON.stringify(payload1));
    event.preventDefault();
});


document.getElementById('jsonSubmit2').addEventListener('click', function(event){
    document.getElementById("output2").textContent = "";   //resets if submitted multiple times
    var req2 = new XMLHttpRequest();
    var payload1 = {};
    payload1[document.getElementById("f2").value] = document.getElementById("f3").value;
    // var payload2 = document.getElementById("v1").value;

    req2.open('POST', "http://httpbin.org/post", true);
    req2.setRequestHeader('Content-Type', 'application/json');
    req2.addEventListener('load',function(){
        if(req2.status >= 200 && req2.status < 400){
            var response = JSON.parse(req2.responseText);


            for (var i = 0 ; i < response.data.length;i++)
                document.getElementById("output2").textContent += response.data[i];

        } else {
            console.log("Error");
        }});
    req2.send(JSON.stringify(payload1));
    event.preventDefault();
});













function checkCity(input1)
{
    if (!isNaN(input1)) {
        alert("Please enter a valid City");
        return false;
    }
    else
        return true;

}