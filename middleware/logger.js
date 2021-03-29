const logger = store => next => action => {
    console.group('LOGGER')
    console.log('The action: ', action)
    const result = next(action)
    console.log('The new state: ', store.getState())
    console.groupEnd()
    return result
}

export default logger
