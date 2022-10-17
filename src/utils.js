import {useRef} from 'react'

// https://stackoverflow.com/a/7061193/104380
export const UUIDv4 = function b(a){return a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,b)};

// Native is preferable but only for React v18+, so for backward-compatibility, use this:
export const useId = () => useRef(UUIDv4()).current;