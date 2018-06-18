const propsToDataAttrs = props =>
  Object.entries(props).reduce((acc, [key, value]) => {
    acc[`data-${String(key).toLowerCase()}`] = value
    return acc
  }, {})

export {propsToDataAttrs}
