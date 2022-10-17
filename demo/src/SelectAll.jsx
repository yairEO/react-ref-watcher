import {useContext} from 'react'
import {useWatchableListener, useWatchableEffect} from '@yaireo/react-ref-watcher'
import ListContext from './List.context'
import Checkbox from './Checkbox'

const SelectAll = ({name, label}) => {
  console.log('"SelectAll" component rendered')

  // get the smart ref from the context (or props, which ever is better in a certain situation)
  const {data, selectedRef, allSelectedRef} = useContext(ListContext)

  // listen to changes in "allSelectedRef" (boolean) and re-render
  const unlisten = useWatchableListener(allSelectedRef)

  // unlisten()

  // listen to changes in "selectedRef" to track if all have been selected or not.
  // does not re-render because the 3rd parameter is a custom function.
  useWatchableEffect(() => {
    const selectedCount = Object.keys(selectedRef.current).length
    allSelectedRef.current = selectedCount === data.length
  }, [selectedRef.current])

  const toggle = e => {
    allSelectedRef.current = e.target.checked

    // (de)select all items
    data.forEach(({name}) => {
      if( e.target.checked )
        selectedRef.current[name] = true
      else
        delete selectedRef.current[name]
    })
  }

  return (
    <div className='list-item'>
      <Checkbox label={label} checked={allSelectedRef.current} onChange={toggle}/>
    </div>
  )
}

export default SelectAll