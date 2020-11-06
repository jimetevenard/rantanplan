const runServer = require('..');
const defaultPort = 8080;


var args = process.argv.slice(2);

// Help
if(args[0] === '--help' || args[0] === '-h') {
    console.log('USAGE : rantanplan [port]');
    console.log('if port is ommited, default port is '+defaultPort);
    process.exit();
}

var portArg = parseInt(args[0]);
var port = isNaN(portArg) ? defaultPort : portArg;

runServer(port);