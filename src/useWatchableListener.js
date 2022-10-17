import {useState, useCallback, useEffect} from 'react'
import {useId} from './utils'
import {setWatcher, removeWatcher} from './propWatcher'

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
    const unlisten = useCallback(() => removeWatcher(ref, id), [ref, id])

    // register a listener for that namespace
    setWatcher(ref, id, (prop, value) => watcher(propName, prop, value, setState))

    // remove callback if component unmounted
    useEffect(() => unlisten, [])

    return unlisten
}

export default useWatchableListener
