var mongoose = require('mongoose');
var http = require('http');
var debug = require('debug')('mean-app:server');
mongoose.Promise = require("bluebird");

var app = require('./config/app.js');

// user modules
var config = require('./config/config.js');
var dbUrl = config.db.db_url;
var port = process.env.PORT || config.app.port;

var errorHandler = require('./config/errorHandler.js');

/***************************************/
/********** Request Handler ************/
var index = require('./routes/index.js');
var todo = require('./routes/todos.js');

app.use('/', index);
app.use('/todo', todo);
app.use(errorHandler.app);

/***************************************/
/****** Server Connection Handling *****/
var server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
server.on('close', onClose);

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    // handle specific listen errors
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    debug('Listening on ' + bind);
    console.log("Server running at port " + bind)
    mongoose.connect(dbUrl, errorHandler.db.onConnect);
}

function onClose(error) {
    if (error) {
        console.log(error);
    } else {
        console.log("Server Closed");
    }
    mongoose.disconnect( errorHandler.db.onDisconnect);
}

/********************************/