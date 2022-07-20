import {useMemo} from 'react'
import propWatcher from './propWatcher'

/**
 * Create a ref-like object that listens to any change in the "current" property
 * and fires all registered callbacks when a change happens to the "current" property.
 */
const useWatchableRef = (initialValue) => useMemo(() => propWatcher({ current: initialValue }), [])

export default useWatchableRef

