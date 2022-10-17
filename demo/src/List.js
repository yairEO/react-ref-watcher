import {useRef} from 'react'
import {useWatchableRef, propWatcher} from '@yaireo/react-ref-watcher'
import ListItem from './ListItem'
import SelectAll from './SelectAll'
import ListContext from './List.context'
import "./styles.scss"

// Mock data
const DATA = [...Array(3)].map((_, i) =>
  ({name: `item-${i+1}`, label: `Item ${i+1}`}))

// The idea is that the main component, this one, defines the state at its
// level and shares using "context" with whoever wants to listen to state changes.
// Since "useState" cannot be used (it triggers a re-render) then refs are used.
const List = () => {
  console.log('"List" component rendered (only once)')
  // A Boolean ref, indicating all list items are selected.
  // "useWatchableRef" makes the "current" property watchable
  // when it changes (by any child component registering to it)
  const allSelectedRef = useWatchableRef(false)

  // Initialize the "current" property as a watchable-object
  const selectedRef = useRef(propWatcher({}))

  const contextValue = { data: DATA,  selectedRef, allSelectedRef }

  return (
    <ListContext.Provider value={contextValue}>
      <div className='list-wrapper'>
        <header>
          <SelectAll label='Select All'/>
        </header>

        {DATA.map(({ name, label }) =>
            <ListItem key={name} {...{name, label}}/>
        )}
      </div>
    </ListContext.Provider>
  )
}

export default List