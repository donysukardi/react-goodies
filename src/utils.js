function noop() {}

/**
 * Takes an argument and if it's an array, returns the first item in the array
 * otherwise returns the argument
 * @param {*} arg the maybe-array
 * @param {*} defaultValue the value if arg is falsey not defined
 * @return {*} the arg or it's first item
 */
function unwrapArray(arg, defaultValue) {
  const _arg = Array.isArray(arg)
    ? /* istanbul ignore next (preact) */ arg[0]
    : arg
  if (!_arg && defaultValue) {
    return defaultValue
  } else {
    return _arg
  }
}

export { noop, unwrapArray }
