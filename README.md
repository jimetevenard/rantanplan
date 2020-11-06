# Ran-tan-plan

This is a stupid and simple server meant to ease testing.

It acts like a in-memory database for storing simple key-value pairs.  
Data can be stored and read via REST call

*Name inspired by [Rantanplan](https://en.wikipedia.org/wiki/Rantanplan)*

## Let's Save Data !

Let's say we want to save the following :

````
{
    "foo":"Hello I'm foo !",
    "bar":"Yet another data"
}
````

### Save data with a POST request

One request per key/value pair, The query String is the *key*, the body is the *value*.

````
curl --request POST 'http://rantanplan-host/foo' --data-raw 'Hello I'm foo !'
curl --request POST 'http://rantanplan-host/bar' --data-raw 'Yet another data'
````

The whole query-string is treated as key, there's no attenpt to parse the slashes or query params.

The body is treated as a plain string, whatever the `content/type` header contents.


### Read stored data with a GET request

Again, that's just an GET HTTP Request.

````
curl --request GET 'http://rantanplan-host/foo'
````

Given the previous requests exemplex, should return `'Hello I'm foo !'`
