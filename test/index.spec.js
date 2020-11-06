const runServer = require('..');
const http = require('http');
const utils = require('./utils');

const testPort = 1234;

const foo = {
    url:`http://localhost:${testPort}/foo`,
    value:"Hello, i'm FOO !"
};
const bar = {
    url:`http://localhost:${testPort}/bar`,
    value:"Hello, i'm BAR !"
};



// Runs the server for testing it.
console.log('Launching test server on port ' + testPort);
runServer(testPort);



/**
 * First GET Call on /foo
 * 
 * We verify that the server return a 404 since nothing has been sent
 * with this path before
 */
let testFirstCall = utils.prepareRequest(foo.url, (resp) => {
    utils.assertEquals(resp.statusCode, 404, 'Fisrt call must respond a 404.')
});



/**
 * We now send the test String with a POST request to /foo
 */
let testPostData = utils.prepareRequest(foo.url, (resp) => {
    utils.assertEquals(resp.statusCode, 200, 'POST must return a 200 code.')
}, foo.value);



/**
 * We now check that the test string has been saved,
 * And that the resver retuns it.
 */
let testGetData = utils.prepareRequest(foo.url, (resp, data) => {
    utils.assertEquals(resp.statusCode, 200, 'Getting the data must return 200 code.');
    utils.assertEquals(data, foo.value, `GET Request to ${foo.url} must return "${foo.value}"`);
});

/**
 * We now save a second value to /bar
 */
let testPostSecondValue = utils.prepareRequest(bar.url, (resp) => {
    utils.assertEquals(resp.statusCode, 200, 'POST must return a 200 code.')
}, bar.value);



/**
 * We now check that the second value has been saved,
 * And that the server retuns it.
 */
let testGetSecondValue = utils.prepareRequest(bar.url, (resp, data) => {
    utils.assertEquals(resp.statusCode, 200, 'Getting the data must return 200 code.')
    utils.assertEquals(data, bar.value, `GET Request to ${bar.url} must return "${bar.value}"`)
});

/**
 * We now check that the second value has been saved,
 * And that the server retuns it.
 */
let testGetAgainFirstValue = utils.prepareRequest(foo.url, (resp, data) => {
    utils.assertEquals(resp.statusCode, 200, 'Getting the data must return 200 code.')
    utils.assertEquals(data, foo.value, `GET Request to ${foo.url} must return "${foo.value}"`);
});



utils.runRequests([
    testFirstCall,
    testPostData,
    testGetData,
    testPostSecondValue,
    testGetSecondValue,
    testGetAgainFirstValue
]);

