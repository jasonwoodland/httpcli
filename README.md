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
	Only print the response body

-h, --header
	Only print the response headers

-d BODY, --data BODY
	Specify a raw request message body
```

##### Examples
```bash
# Simply perform a GET request on the current path
GET

# Perform a GET request on a path
GET /some/resource

# Perform a PUT request with a message body
PUT /some/thing --data 'Howdy do'
```

### To do

Really more of a wish list since I haven't got the time.

  - Ability to set request headers
  - Persistent cookies between sessions
  - An easier way to send JSON in the request message body.
  - Config file
