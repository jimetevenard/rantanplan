const { Console } = require('console');
const http = require('http');


const jsonData = {};

function sendResponse(response, data) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write(data);
    response.end();
}

function sendNotFound(response) {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.write('Nope.');
    response.end();
}

function saveData(request) {
    let body = '';
    request.on('data', chunk => {
        body += chunk.toString();
    });
    request.on('end', () => {
        jsonData[request.url] = body;
    });
}

function runServer(port){
    http.createServer(function (request, response) {

        if (request.method === 'POST') {
            saveData(request);
            sendResponse(response, 'OK, saved !');
    
        } else if (request.method === 'GET') {
            let data = jsonData[request.url];
            if(typeof data === 'string'){
                sendResponse(response, data);
            } else {
                sendNotFound(response);
            }
            
        }
    
    
    }).listen(port);
    
    console.log('Server listening on port ' + port);
}


module.exports = runServer;


