# httpc

An interactive HTTP Client&mdash;written in [Node.js](https://nodejs.org/en/).

This is a small tool I quickly whipped up that allows you to conveniently make HTTP requests. You can only set the request method and message body at the moment but I'll add features as I need them. Feel free to contribute.

### Getting started

```bash
git clone https://github.com/jasonwoodland/httpc.git
npm install -g ./httpc
```

### Usage

##### Change domains
```
> //example.net
```

##### Change paths
```
> some/path
```

##### Send a request with one of the HTTP methods
```
> GET
> POST
> PUT
> PATCH
> DELETE
> HEAD
> OPTIONS
```

##### Perform a request on an absolute path
```
> GET /some/resource
```

##### Only print the response body from a request
```
> GET /some/resource -b
```

##### Only print the headers
```
> GET -h
```

##### Set the request message body
```
> PUT /something -d 'Howdy do'
```

### Tips/features

  - Use the up/down arrow keys to browse history
  - you can enable/disable Vi-mode and the default URI in `lib/node_modules/httpc/httpc`

### Files

You can find out where it's installed using `which httpc`.
The supporting files are located in relatively in `../lib/node_modules/httpc/`.
So for example: (if you use MacPorts)
```
/opt/local/bin/httpc
/opt/local/lib/node_modules/httpc
```

### To do

Really more of a wish list since I haven't got the time.

  - Remembers last URI from session
  - Persistent cookies between sessions
  - A better way to send JSON in the request message body.
  - Config file
