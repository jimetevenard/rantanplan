# Ran-tan-plan

## A REST HTTP Mock-sever

![Build And Test](https://github.com/jimetevenard/rantanplan/workflows/Build%20And%20Test/badge.svg)

This is a stupid and simple server, designed to ease unit or integration testing.

It acts like an in-memory database for storing simple key-value pairs.  
Data can be stored and read via REST call

*The name is inspired by [Rantanplan](https://en.wikipedia.org/wiki/Rantanplan)*

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

The whole query-string is treated as the key, there's no attempt to parse the slashes or query params.

The body is treated as a plain string, whatever the `content/type` header contents.


### Read stored data with a GET request

Again, that's just a GET HTTP Request.

````
curl --request GET 'http://rantanplan-host/foo'
````

Given the previous requests examples, it should return `'Hello I'm foo !'`
