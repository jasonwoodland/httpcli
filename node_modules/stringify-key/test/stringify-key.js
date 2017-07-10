'use strict';
/*jshint asi: true */

var test = require('trap').test
  , stringify = require('..')

test('given simple key without any modifier', function (t) {
  var key =  {
    name: 'c',
    ctrl: false,
    meta: false,
    shift: false
  };
  t.equal(stringify(key), 'c', 'returns just the name of the key')
})

test('given multi char key without any modifier', function (t) {
  var key =  {
    name: 'space',
    ctrl: false,
    meta: false,
    shift: false
  };
  t.equal(stringify(key), 'space', 'returns just the name of the key')
})

test('ctrl modifier', function (t) {
  var key =  {
    name: 'c',
    ctrl: true,
    meta: false,
    shift: false
  };
  t.equal(stringify(key), 'ctrl-c', 'returns ctrl-letter')
});

test('shift modifier', function (t) {
  var key =  {
    name: 'c',
    ctrl: false,
    meta: false,
    shift: true
  };
  t.equal(stringify(key), 'shift-c', 'returns shift-letter')
});

test('shift and ctrl modifier', function (t) {
  var key =  {
    name: 'c',
    ctrl: true,
    meta: false,
    shift: true
  };
  t.equal(stringify(key), 'shift-ctrl-c', 'returns shift-ctrl-letter')
});

test('alt modifier', function (t) {
  var key =  {
    name: 'c',
    ctrl: false,
    meta: false,
    alt: true
  };
  t.equal(stringify(key), 'alt-c', 'returns alt-letter')
});

test('shift, meta and ctrl modifier', function (t) {
  var key =  {
    name: 'c',
    ctrl: true,
    meta: true,
    shift: true
  };
  t.equal(stringify(key), 'shift-meta-ctrl-c', 'returns shift-meta-ctrl-letter')
});

test('given multi char key with ctrl modifier', function (t) {
  var key =  {
    name: 'space',
    ctrl: true,
    meta: false,
    shift: false
  };
  t.equal(stringify(key), 'ctrl-space', 'returns ctrl-letters')
})
