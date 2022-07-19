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

    return new Proxy(obj, {
        // watch when a property is set
        set(target, prop, value) {
            // do nothing if value hasn't changed, to avoid a possible re-render when the same value is set again
            if( target[prop] === value) return;

            // set the value
            target[prop] = value;

            // update watchers a prop has changed
            if( prop !== '__WATCHERS' ) {
                Object.values(target?.__WATCHERS || []).forEach(cb => cb(prop, value))
            }
        },

        // watch when a prop is deleted
        deleteProperty(target, prop) {
            if (prop in target) {
                delete target[prop]
                if( prop !== '__WATCHERS' ) {
                Object.values(target?.__WATCHERS || []).forEach(cb => cb(prop))
                }
            }
        },
    })
}

export default propWatcher
