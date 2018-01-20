# httpcli
![httpcli](https://raw.githubusercontent.com/jasonwoodland/httpcli/master/httpcli.gif)

Test and develop REST APIs&mdash;an interactive HTTP client.

This is a small tool that allows you to conveniently make HTTP requests. Feel free to make a feature request.

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
httpcli provides a flexible way of passing data for the JSON request body as well as query parameters, setting cookies and headers.

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
-c [COOKIES]..., --cookie [COOKIES]...
	Specify cookies for the Cookie header.

-d [DATA]..., --data [DATA]...
	Specify request body data to send as a JSON object.

-h [HEADERS]..., --header [HEADERS]...
	Specify headers to be set for the request

-q [QUERY]..., --query [QUERY]...
	Specify query parameters.

-C [COOKIES]..., --store-cookie [COOKIES]...
	Specify cookies for the Cookie header to send with each following request.

-D [DATA]..., --store-data [DATA]...
	Specify request body JSON data to send with every following request which
	specifies the -d option.

-H [HEADERS]..., --store-header [HEADERS]...
	Specify headers to be set for every following request which specifies the
	-h option.

-Q [QUERY]..., --store-query [QUERY]...
	Specify query parameters to send with every following request which
	specifies the -q option.

-b, --body-only
	Only print the response body.

-B, --no-body
	Only print the response headers.

-v, --verbose
	Print the request headers.

-V, --always-verbose
	Print the request headers for each following request.

-r, --rm-stored
	Remove stored data, headers and queries.
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

### Changelog

#### 26 Sep 2017
  - Now detects more JSON Content-Types
  - Able to set request headers
  - You can now set the Cookie header conveniently with `-c`
  - Ability to print request headers
  - Now remembers the last path/resource from the previous session

### To do

  - [x] Ability to set request headers
  - [x] View request headers
  - [ ] View entire request
  - [ ] Persistent data and queries between sessions
  - [ ] Persistent cookies between sessions
  - [ ] Persistent history
  - [ ] Make requests with form body data
  - [x] An easier way to send JSON in the request message body. (-d flag)
  - [ ] Ability to read persistent data/queries and cookies
  - [ ] Ability to delete cookies
  - [ ] Ability to send a raw request body
  - [ ] Config file
