/**
 * Created by Ellard on 3/1/2016.
 */

//JS Database functions found in public folder


var express = require('express');

var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 8080);

var session = require('express-session');
app.use(session({secret:'SecretPassword'}));


var mysql = require('mysql');
var pool = mysql.createPool({
    host  : 'localhost',
    user  : 'student',
    password: 'default',
    database: 'student'
});


app.use(express.static(__dirname + '/public'));






app.get('/',function(req,res,next) {
    var context = {};

    //Select all data from workouts table
    pool.query('SELECT * from workouts', function(err,rows,fields){
        if(err){
            console.log(err);
            next(err);
            return;

        }
        context.results = JSON.stringify(rows);
        console.log(context.results);
        res.render('home',context);
    });
});



//BoilerPlate function from Assignment Instructions.
app.get('/reset-table',function(req,res,next){
    var context = {};
    pool.query("DROP TABLE IF EXISTS workouts", function(err){
        var createString = "CREATE TABLE workouts("+
            "id INT PRIMARY KEY AUTO_INCREMENT,"+
            "name VARCHAR(255) NOT NULL,"+
            "reps INT,"+
            "weight INT,"+
            "date DATE,"+
            "lbs BOOLEAN)";
        pool.query(createString, function(err){
            context.results = "Table reset";
            res.render('home',context);
        })
    });
});


app.get('/insertData',function(req,res,next){
    var context = {};

    //Insert Data fields into workouts table
    pool.query("INSERT INTO workouts (`name`, `reps`, `weight`, `date`, `lbs`) VALUES (?,?,?,?,?)", [req.query.name, req.query.reps, req.query.weight, req.query.date, req.query.lbs], function(err, result){
        if(err){
            console.log(err);
            next(err);
            return;
        }
        pool.query("SELECT * FROM workouts",function(err,rows,field)
        {
            if(err)
            {
                console.log(err);
                next(err);
                return;
            }
            console.log(rows);
            context = JSON.stringify(rows);
            res.json(context);   //no res.render

        });

        //context.results = "Inserted id " + result.insertId;
    });
});

app.get('/delete', function(req, res, next) {
    var context = {};
    console.log("Hi from /Delete");
    console.log(req.query.id);
    pool.query("DELETE FROM workouts WHERE id = ?", [req.query.id], function(err, result) {
        if(err){
            console.log(err);
            next(err);
            return;
        }
        pool.query('SELECT * FROM workouts', function(err, rows, fields){
            if(err){
                console.log(err);
                next(err);
                return;
            }
            context = JSON.stringify(rows);
            console.log(context);
            res.json(context);
        });
    });
});


app.get('/update2',function(req,res,next){
    var context = {};
    console.log("Before select query");
    pool.query("SELECT * FROM workouts WHERE id=?", [req.query.id], function(err, result){
        console.log("After select query");

        if(err){
            next(err);
            return;
        }
        if(result.length == 1){
            console.log("Update query check");
            var curVals = result[0];
            pool.query("UPDATE workouts SET name=?, reps=?, weight=?, date=? , lbs=? WHERE id=? ",
                    [req.query.name,req.query.reps,req.query.weight,req.query.date, req.query.lbs,req.query.id],

                function(err, result){
                    if(err){
                        console.log(err);
                        next(err);
                        return;
                    }
                    pool.query("SELECT * FROM workouts", function (err,rows,fields)
                    {
                        if (err){
                            next(err);
                            return;
                        }
                        context = JSON.stringify(rows);
                        res.json(context);
                    });


                });
        }
    });
});

app.get('/showData', function(req, res){
    var context = {};
    pool.query('SELECT * FROM workouts', function(err, rows, fields){
        if(err){
            next(err);
            return;
        }
        context = JSON.stringify(rows);
        console.log(context);
        res.json(context);   //no res.render
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



//Server Start functions

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

