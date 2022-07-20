import {useId} from 'react'

/**
 * Similar to "useSmartRefListener" but just listens without automatically re-rendering (no 'useState')
 * @param {*} callback fires when a ref change detetced
 * @param {*} dependencies array of watchable "smart" refs
 */
const useWatchableEffect = (callback, dependencies) => {
    const id = useId()

    dependencies.forEach(ref => {
        // catch errors
        if( !ref ) {
            console.warn("useWatchableEffect - ref does not exists")
            return
        }

        if( !ref.__WATCHERS ) {
            console.warn("useWatchableEffect - ref is not watchable. Did you pass the correct Object?")
            return
        }

        // register a listener for that namespace
        ref.__WATCHERS[id] = callback
    })
}

export default useWatchableEffect;