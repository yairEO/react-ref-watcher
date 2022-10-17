import {useContext} from 'react'
import {useWatchableListener} from '@yaireo/react-ref-watcher'
import ListContext from './List.context'
import Checkbox from './Checkbox'

const ListItem = ({name, label}) => {
  // get the smart ref from the context (or props, which ever is better in a certain situation)
  const {selectedRef} = useContext(ListContext)

  // listen to changes for that ref in a specific property ("name")
  useWatchableListener(selectedRef.current, name)

  const toggle = e => {
    // "selectedRef.current" only contains keys for SELECTED items
    if( e.target.checked ) {
      selectedRef.current[name] = true
    }
    else {
      delete selectedRef.current[name] // remove the property
    }
  }

  console.log(name, "component rendered")

  return (
    <div className='list-item'>
      <Checkbox label={label} checked={selectedRef.current[name]} onChange={toggle}/>
    </div>
  )
}

export default ListItem