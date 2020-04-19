var url = 'https://mylogger.io/log'

function logger(message){
    // Send an HTTP method!
    console.log(message);
}

module.exports.log = logger;
