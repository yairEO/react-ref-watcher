import {useEffect} from 'react'
import {useId} from './utils'
import {setWatcher, removeWatcher} from './propWatcher'

/**
 * Similar to "useWatchableListener" but just listens without automatically re-rendering (no 'useState')
 * @param {*} callback fires when a ref change detetced
 * @param {*} dependencies array of watchable refs
 */
const useWatchableEffect = (callback, dependencies) => {
    const id = useId()

    useEffect(() => {
        // bind the callback to all dependencies
        dependencies.forEach(ref => {
            setWatcher(ref, id.current, callback)
        })

        // remove callback if component unmounted
        return () => {
            dependencies.forEach(ref => removeWatcher(ref, id.current))
        }
    }, dependencies)
}

export default useWatchableEffect