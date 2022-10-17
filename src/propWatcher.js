/**
 * Watches for changes of an object (property set/deleted)
 * @param {Object} obj the object to listen to for changes
 */
const propWatcher = obj => {
    // add a special property for the change listeners callbacks to register on
    !obj.__WATCHERS && Object.defineProperty(obj, '__WATCHERS', {
        enumerable : false,
        writeable: true,
        value : {}
    });

    // update watchers (when prop gets set/deleted)
    function runWatchers(target, prop, value) {
        if( prop !== '__WATCHERS' ) {
            Object.values(target?.__WATCHERS || []).forEach(cb => cb(prop, value))
        }
    }

    return new Proxy(obj, {
        // watch when a property is set
        set(target, prop, value) {
            // do nothing if value hasn't changed, to avoid a possible re-render when the same value is set again
            if( target[prop] === value) return true

            // set the value
            target[prop] = value;
            runWatchers(target, prop, value)
            return true
        },

        // watch when a prop is deleted
        deleteProperty(target, prop) {
            if (prop in target) {
                delete target[prop]
                runWatchers(target, prop)
            }
            return true
        },
    })
}

export const setWatcher = (obj, id, callback) => {
    if( !obj.__WATCHERS ) {
        console.warn('Object is not watchable. Did you pass the correct Object?')
        return
    }

    if( !callback || typeof callback != 'function' ) {
        console.warn('Invalid callback')
        return
    }

    // register a listener for that namespace
    obj.__WATCHERS[id] = callback
}

export const removeWatcher = (obj, id) => {
    delete obj.__WATCHERS[id]
}

export default propWatcher
