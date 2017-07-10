var format = require('util').format;

function assertKey(key) {
  if (!key.name) throw new Error('key needs to have at least the [name] property set to a string');
}

module.exports = function stringifyKey(key) {
  assertKey(key);

  return format(
      '%s%s%s%s%s'
    , (key.shift ? 'shift-' : '')
    , (key.meta ? 'meta-' : '')
    , (key.alt ? 'alt-' : '')
    , (key.ctrl ? 'ctrl-' : '')
    , key.name
  );
};
 
