/**
 * Created by Ellard on 2/12/2016.
 */
var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 8080);




app.route('/')
    .post(function(req,res){
        // console.log(JSON.stringify(req.body));
        var bodyP = [];
        var queryP= [];
        var postData = {};
       // var bodyData = {};
        for (var i in req.body) {
            if (req.body.hasOwnProperty(i))
                bodyP.push({'key': i, 'value': req.body[i]});

        }

        for (var j in req.query)
        {
            if (req.query.hasOwnProperty(j)) {
                queryP.push({'key': j, 'value': req.query[j]});
                console.log(j, req.query[j]);
            }
        }

        postData.dataList2  = bodyP;
        postData.dataList3 = queryP;
        res.render('home', postData);
    })

    .get(function(req,res){

        var queryP = [];
        var queryData = {};


         console.log(Object.keys(req).length);


         for (var i in req.query){
             if (req.query.hasOwnProperty(i)) {
                queryP.push({'key': i, 'value': req.query[i]});
                console.log(i, req.query[i]);
             }
         }

        queryData.dataList = queryP;
        res.render('home.handlebars', queryData);
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
