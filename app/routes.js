//this is where CRUD would be done / include API routes in future

//get nerd model
var Nerd = require('./models/nerd');

    module.exports = function(app) {

        //server routes ===
        // handle api calls, authentication routes etc

        //example api route
        app.get('/api/nerds', function(req, res) {
            //use mongoose to get all 'Nerds' in db
            Nerd.find(function(err, nerds) {

                //if error, send the error
                //nothing after res.send(err) executes

                if (err)
                    res.send(err);

                res.json(nerds) // return in JSON format
            });
        });

        // add route to handle creating (app.post)

        // add route to handle delete (app.delete)

        //frontend routes ===
        //route to handle angular requests
        //catch-all route
        app.get('*', function(req, res) {
        //perhaps should be sendFile? note if doesn't work
            res.sendfile('./public/views/index.html'); // loads public/index.html file to route url
        });

    };
