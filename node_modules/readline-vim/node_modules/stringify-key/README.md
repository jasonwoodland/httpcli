# stringify-key [![build status](https://secure.travis-ci.org/thlorenz/stringify-key.png)](http://next.travis-ci.org/thlorenz/stringify-key)

Stringifies key objects emitted by nodejs [readline](http://nodejs.org/api/readline.html).

Counter part to [parse key](https://github.com/thlorenz/parse-key).

## Installation

    npm i stringify-key

## Usage

```js
  var stringifyKey = require('stringify-key');

  var key =  { name: 'c', ctrl: true, meta: false, shift: false };
  console.log(stringifyKey(key)); // ctrl-c

  key =  { name: 'c', ctrl: true, meta: true, shift: true };
  console.log(stringifyKey(key)); // shift-meta-ctrl-c
```

## Limitations

Although the algorithm works for all keys, the [readline module](http://nodejs.org/api/readline.html) doesn't work consistent in all terminals. For example, on
a `Mac Lion xTerm` the `meta` key is never registered.

### Meta

As just stated the `meta` key is not registered (at least in xTerm), however if present, `stringify-key` will take it
into account.

### Ctrl 

The `ctrl` key seems to work properly in `readline`, except for the following:

- `ctrl-i` interpreted as `tab`
- `ctrl-h` interpreted as `backspace`
- `ctrl-j` and `ctrl-m`, both interpreted as `enter`
- `ctrl-[;',/]` are also not interpreted correctly

### Shift 

The `shift-letter` is correctly registered as well, however pressing `ctrl-shift` and a letter together registers `ctrl`
only. 
Here is the most likely [cause for the latter](https://github.com/joyent/node/blob/master/lib/readline.js#L920), since letters are never
uppercased when `ctrl` is pressed.

### Alt

There is no code inside the `readline` module that registers pressing the `alt` key.  
Pressing  `alt` in conjunction with a letter is used to enter characters otherwise not available on the keyboard,
i.e. `alt-p` prints `π`. 

However if an `alt : true` is part of the passed `key` object, it is considered by `stringify-key`.

### Moral

I'm not sure if the unexplained problems above are caused by an incorrect implemention in `readline` or the underlying terminal.
I suggest to investigate the [readline source](https://github.com/joyent/node/blob/master/lib/readline.js) in order to
get more information and/or fix problems.

In conclusion, the moral is to expect unexpected results (npi) when using `stringify-key` for keys emitted by `readline`.
