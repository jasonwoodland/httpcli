# httpcli
![httpcli](https://raw.githubusercontent.com/jasonwoodland/httpcli/master/httpcli.png)

Test and develop REST APIs&mdash;an interactive HTTP client.

This is a small tool that allows you to conveniently make HTTP requests. You can only set the request method and message body at the moment but I'll add features as I need them. Feel free to create a pull request.

### Features

  - Readline bindings
  - Optional vi-mode
  - Tab completion
  - Persistent sessions

### Getting started

```bash
git clone https://github.com/jasonwoodland/httpcli.git && npm install -g ./httpcli
```

### Starting

```bash
# Start from the previous session's path
httpcli

# Start from a relative or absolute path
httpcli http://example.net
```

### Usage

##### Synopsis

```bash
# Change the working URI by specifying either a relative or absolute URI
URI

# Perform a request, optionally specify a relative or absolute URI or any options for that request
METHOD [URI] [OPTIONS]

# Set persistent options
OPTIONS
```

##### Changing the current path

```bash
# Change path absolute to the domain name
/an/absolute/path

# Change relative to the current path
../some/relative/path
```

##### Changing hosts

```bash
# Change hosts with a different scheme
https://example.net/

# Change hosts with the same scheme
//example.net/
```

##### Queries and request data
httpcli provides a flexible way of passing data as the JSON request body as well as the query parameters.

```bash
# Setting query parameters
-q version=2 key="some value"

# Specifying strings in the JSON request body
-d key=value "another key"="another value"

# Specifying an array (you can use commas or spaces to separate data)
-d firstArray=[1, 2, 3] secondArray=[4 5 6]

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

-d [DATA]..., --data [DATA]...
	Specify request body data to send as a JSON object.

-q [QUERY]..., --query [QUERY]...
	Specify query parameters.

-D [DATA]..., --persistent-data [DATA]...
	Specify request body data to send with every following request which
	specifies the -d flag. Useful for sending session data.

-Q [QUERY]..., --persistent-query [QUERY]...
	Specify query parameters to send with every following request which
	specifies the -q flag. Useful for sending session data.

-r, --rm-persistent
	Remove persistent data and queries sent with requests.
```

##### Examples
```bash
# Perform a GET request on the current path/resource
GET

# Perform a GET request on a resource relative to the current path
GET some/resource

# Perform a GET request on a resource relative to the current host

# Perform a PUT request with request data
PUT some/resource --data name="value" array=[1, 2, 3] object={a=b, x=y}
```

### To do
Let me know if you would like to see any of these features implemented (or any you can think of).

  - [ ] Ability to set request headers
  - [ ] Persistent data and queries between sessions
  - [ ] Persistent cookies between sessions
  - [ ] Persistent history
  - [x] An easier way to send JSON in the request message body. (-d flag)
  - [ ] Ability to read persistent data/queries and cookies
  - [ ] Ability to delete cookies
  - [ ] Ability to send a raw request body
  - [ ] Config file
