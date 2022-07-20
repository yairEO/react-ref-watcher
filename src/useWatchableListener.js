import {useId, useState, useCallback} from 'react'

/**
 * Listens to refs changes.
 * By default will trigger a re-render in the component which is using this hook if
 * a change in the ref itself or specific property is detected.
 * @param {Object} ref an object to listen to
 * @param {String} propName (optional) specific property name to watch within the `ref`
 * @param {function} watcher (optional) the logic which decides if the component should be re-rendered
 */
const useWatchableListener = (
    ref,
    propName,
    watcher = (propName, prop, value, setState) =>
        prop === propName // if "propName" is not defined, listen to all changes at any prop
            ? setState(value)
            : !propName && setState(Math.random()) // if no "propName" supplied, assume any change to any prop should be watched, hence the value is not important and to trigger a re-render a new state must be uniquly generated
    ) => {

    const [state, setState] = useState()
    const id = useId()

    const unlisten = useCallback(() => { delete ref.__WATCHERS[id] }, [ref, id])

    // catch errors
    if( !ref ) {
        console.warn("useWatchableListener - ref does not exists")
        return
    }

    if( !ref.__WATCHERS ) {
        console.warn("useWatchableListener - ref is not watchable. Did you pass the correct Object?")
        return
    }

    // register a listener for that namespace
    ref.__WATCHERS[id] = (prop, value) => watcher(propName, prop, value, setState)

    return unlisten
}

export default useWatchableListener