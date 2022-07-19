import {useId} from 'react'

/**
 * Similar to "useSmartRefListener" but just listens without automatically re-rendering (no 'useState')
 * @param {*} callback fires when a ref change detetced
 * @param {*} dependencies array of watchable "smart" refs
 */
 export const useSmartRefEffect = (callback, dependencies) => {
    const id = useId()

    dependencies.forEach(ref => {
      // catch errors
      if( !ref ) {
        console.warn("useSmartRefEffect - ref does not exists")
        return
      }

      if( !ref.__WATCHERS ) {
        console.warn("useSmartRefEffect - ref is not watchable. Did you pass the correct Object?")
        return
      }

      // register a listener for that namespace
      ref.__WATCHERS[id] = callback
    })
}