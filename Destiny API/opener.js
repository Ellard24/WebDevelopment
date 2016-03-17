var request = require('request');
var express = require('express');
//var bootstrap = require('bootstrap');


var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');
var credentials = require('./credentials.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.use(express.static(__dirname + '/public'));


app.get('/',function(req,res,next){
    var context = {};
    res.render('home',context);
});


app.get('/API', function(req,res,next){
    var context = {};
    res.render('api', context);

});


app.get('/Clan', function (req,res,next){
    var context = {};

    var data2 = [];
    var data3 = [];




    function alertObj(obj) {

        for (var data in obj) {
            if(typeof(obj[data]) === "object")
                alertObj(obj[data]);
            else {
                if (obj.hasOwnProperty(data)) {
                    if ((data = 'displayName') && (obj[data] != undefined))
                        data2.push({"key": data, "value": obj[data]});
                }
                else
                    return;
            }
        }
    }



    request({
            "url" : "https://www.bungie.net/Platform/Group/188356/MembersV3/?currentPage=1",
            "method" : "GET",
            "headers" : {
                "X-API-Key" : credentials.destinyKey,
                "Content-Type": "application/json" }},
        function(err, response1, body){
            if(!err && response1.statusCode < 400){

                var data1 = JSON.parse(body);
                //console.log(data1.Response.results[0].user);
                var people =  data1.Response.results;



                var key = 'displayName';
                for (var i = 0; i < people.length;i++) {
                            data2.push({"key": key, "value": people[i].user.displayName});

                }

                console.log(data2);

                /**
                alertObj(data1);

                for (var i = 0, len=data2.length; i < len; i++)
                    data3[data2[i]['value']] = data2[i];

                data2 = new Array();
                for (var key in data3)
                    data2.push(data3[key]);
                **/
                context.datalist = JSON.stringify(data1,null,'\t');
                context.datalist2 = data2;
                res.render('clan',context);
            } else {
                if(response1){
                    console.log(response1.statusCode);
                }
                next(err);
            }
        });


});


app.get('/Equipment', function (req,res,next){
    var context = {};

    var data2 = [];
    var data3 = [];




    function alertObj(obj) {

        for (var data in obj) {
            if(typeof(obj[data]) === "object")
                alertObj(obj[data]);
            else {
                if (obj.hasOwnProperty(data)) {
                   // if ((data = 'itemName') || (data = 'itemDescription'));
                        data2.push({"key": data, "value": obj[data]});
                }
                else
                    return;
            }
        }
    }



    request({
            "url" : "http://www.bungie.net/Platform/Destiny/Manifest/InventoryItem/135862170",
            "method" : "GET",
            "headers" : {
                "X-API-Key" : credentials.destinyKey,
                "Content-Type": "application/json" }},
        function(err, response, body){
            if(!err && response.statusCode < 400){

                var data1 = JSON.parse(body);
               // console.log(data1);
                var items =  data1.Response;








              //  console.log(data2);
                var jujuImage = JSON.stringify(items.data.inventoryItem.icon);
                console.log(jujuImage);


                context.image = String("http://www.bungie.net" + JSON.parse(jujuImage));
                context.datalist = JSON.stringify(items,null,'\t');
                //console.log(context.datalist);
                res.render('equipment',context);
            } else {
                if(response){
                    console.log(response.statusCode);
                }
                next(err);
            }
        });
});



app.get('/Grimoire', function (req,res,next){
    var context = {};

    var data2 = [];
    var data3 = [];
    var data4 = [];

    function alertObj(obj) {

        for (var data in obj) {
            if(typeof(obj[data]) === "object")
                alertObj(obj[data]);
            else {
                if (obj.hasOwnProperty(data)) {
                    if ((data = 'cardDescription') && (obj[data] != undefined))
                    {
                        data2.push({"key": data, "value": obj[data]});
                    }
                    if ((data = 'sheetPath') && (obj[data] != undefined))
                    {
                        data4.push(JSON.stringify(obj[data]));


                    }
                }
                else
                    return;
            }
        }
    }



    request({
            "url" : "http://www.bungie.net/Platform/Destiny/Vanguard/Grimoire/Definition/",
            "method" : "GET",
            "headers" : {
                "X-API-Key" : credentials.destinyKey,
                "Content-Type": "application/json" }},
        function(err, response, body){
            if(!err && response.statusCode < 400){



                var data1 = JSON.parse(body);

                alertObj(data1);



                for (var i = 0, len=data2.length; i < len; i++)
                    data3[data2[i]['value']] = data2[i];

                data2 = new Array();
                for (var key in data3)
                    data2.push(data3[key]);

                "http://www.bungie.net";
                console.log(data4[1]);
                context.datalist = data2;
                context.image1 =  String("http://www.bungie.net" + JSON.parse(data4[1]));
                console.log(context.image1);
                //console.log(context.datalist);
                res.render('grim',context);
            }
            else
            {
                if(response){
                    console.log(response.statusCode);
                }
                next(err);

            }

        })
});

app.get('/Raid', function (req,res,next){
    var context = {};

    var data2 = [];
    var data3 = [];



    /**
    function alertObj(obj) {

        for (var data in obj) {
            if(typeof(obj[data]) === "object")
                alertObj(obj[data]);
            else {
                if (obj.hasOwnProperty(data)) {
                    data2.push({"key": data, "value": obj[data]});
                }
                else
                    return;
            }
        }
    }
     */


    request({
            "url" : "http://www.bungie.net/Platform/Destiny/Stats/ActivityHistory/1/4611686018429671534/2305843009215214460/?mode=Raid&count=20&page=0&definitions=true",

            "method" : "GET",
            "headers" : {
                "X-API-Key" : credentials.destinyKey,
                "Content-Type": "application/json" }},
        function(err, response, body){
            if(!err && response.statusCode < 400){

                var data1 = JSON.parse(body);

                //alertObj(data1);

                for (var i = 0, len=data2.length; i < len; i++)
                    data3[data2[i]['value']] = data2[i];

                data2 = new Array();
                for (var key in data3)
                    data2.push(data3[key]);

                context.datalist = JSON.stringify(data1,null, '\t');
                res.render('raid',context);
            } else {
                if(response){
                    console.log(response.statusCode);
                }
                next(err);
            }
        });
});


app.use(function(req,res){
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});


//                        data2.push({"key": data, "value": obj[data]});

// ?currentPage=1&itemsPerPage=10
//http://www.bungie.net/Platform/Destiny/Explorer/Items/?buckets=HeavyWeapon&count=500&definitions=true
//"http://www.bungie.net/Platform/Destiny/Explorer/Items/?buckets=2048&count=5&rarity=6&definitions=true"