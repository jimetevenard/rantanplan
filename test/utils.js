// Minimal "no-framwork" test
const http = require('http');
const utils = {};
const internal = {};

internal.pendingRequests = [];

internal.exitSucces = function () {
    console.log('\n=================================');
    console.log('ALL REQUESTS SUCCEEDED - TESTS OK');
    process.exit();
}

internal.displayCount = function () {
    console.log(`\nRUNNING TEST REQUEST ${internal.count[0]} of ${internal.count[1]}`);
    internal.count[0]++;
}

/**
 * Util function that mimics methods from XUnits test framworks.
 * Compares actual to expected, and throw an error if values are not equals.
 * 
 * @param {*} actual Actual result
 * @param {*} expected Excepted resut
 * @param {*} message Description of assertion.
 */
utils.assertEquals = function (actual, expected, message) {
    if (actual !== expected) {
        throw new Error(`ASSERTION FAILED : ${message}. Excpeted ${expected} but was ${actual}.`);
    } else {
        console.log('ASSERTION OK : ' + message)
    }
};

/**
 * Prepares an HTTP Request Instance.
 * 
 * The callback function will be called at the end of request if it succeed,
 * with (resp, data) arguments, where resp is the http.IncomingMessage and data the result as a string.
 * 
 * If the request suceed, utils.runNextRequest() will be called to run the next request to test.
 * 
 * If the 'data' param is supplied, the request will be a POST, and 'data' it's body.
 * Othewise request will be a GET.
 * 
 * see https://nodejs.org/api/http.html#http_class_http_clientrequest
 * @param {*} url 
 * @param {*} endCallback 
 * @param {*} data 
 */
utils.prepareRequest = function (url, endCallback, data) {
    let options = {};
    if (data) options.method = 'POST';
    let req = http.request(url, options, (resp) => {
        let data = '';
        resp.on('end', () => {
            endCallback(resp, data);
            utils.runNextRequest();
        });
        resp.on('data', (chunk) => {
            data += chunk.toString();
        });

    }).on("error", (e) => { throw e; });

    if (data) req.data = data;
    return req;
}

/**
 * Adds the requests to the Queue and runs the first of it.
 * 
 * If the request has been instanciated with utils.prepareRequest(),
 * the next request in the queue will be sent after the request has suceeded.
 * 
 * @param {*} requestsArray an array of requests.
 */
utils.runRequests = function (requestsArray) {
    internal.pendingRequests = requestsArray;
    internal.count = [1, requestsArray.length];
    utils.runNextRequest();
}
/**
 * Runs the next request in the queue.
 */
utils.runNextRequest = function () {
    let request = internal.pendingRequests.shift();
    if (request) {
        internal.displayCount();
                
        if (request.data) {
            request.write(request.data);
        }
        request.end();
    } else {
        // no more request to run, goodbye !
        internal.exitSucces();
    }

}

module.exports = utils;