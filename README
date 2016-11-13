# httpc

An interactive HTTP Client&mdash;written in [Node.js](https://nodejs.org/en/).

This is a small tool I quickly whipped up that allows you to conveniently make HTTP requests. You can only set the request method and message body at the moment but I'll add features as I need them. Feel free to contribute.

### Features

  - Uses readline
  - Optional Vi mode
  - Tab completion for request methods and options
  - Persistent path between sessions

### Getting started

```bash
git clone https://github.com/jasonwoodland/httpc.git
npm install -g ./httpc
```

### Starting

```bash
# Start from the last path
httpc

# Start from a relative or absolute path
httpc http://example.net
```

### Usage

##### Synopsis

```bash
# Change the current path
PATH

# Perform a request, optionally specify a path or any options
METHOD [PATH] [OPTIONS]
```

##### Changing the current path

```bash
# Change path absolute to the domain name
/an/absolute/path

# Change relative to the current path
../some/relative/path
```

##### Changing domains

```bash
//example.net/

# Change protocols
https://example.net/
```

##### Queries and request data

```bash
# Setting query parameters
-q version=2 key="some value"

# Specifying strings in the request body data
-d this=that "some thing"="some thing else"

# Specifying an array (you can use commas or spaces to separate data)
-d numbers=[1, 2, 3] more=[4 5 6]

# Specifying an object 
-d user={name=jason age=20 skills=[apis, "looking cool"]}
```

##### Request methods

```
GET
POST
PUT
PATCH
DELETE
OPTIONS
HEAD
```

##### Request options

```bash
-b, --body
	Only print the response body.

-h, --header
	Only print the response headers.

-d DATA, --data DATA
	Specify request body data to send as a JSON object.

-q QUERY, --query QUERY
	Specify query parameters.

-D DATA, --persistent-data DATA
	Specify request body data to send with every following request which
	specifies the -d flag. Useful for sending session data.

-Q QUERY, --persistent-query QUERY
	Specify query parameters to send with every following request which
	specifies the -q flag. Useful for sending session data.

-r, --rm-persistent
	Remove persistent data and queries sent with requests.
```

##### Examples
```bash
# Simply perform a GET request on the current path
GET

# Perform a GET request on a path
GET /some/resource

# Perform a PUT request with request data
PUT /some/thing --data this="that" array=[1, 2] object={a=b, c=d}
```

### To do

  - [ ] Ability to set request headers
  - [ ] Persistent data and queries between sessions
  - [ ] Persistent cookies between sessions
  - [ ] Persistent history
  - [x] An easier way to send JSON in the request message body.
  - [ ] Config file
