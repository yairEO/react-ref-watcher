const Checkbox = ({label, checked = false, onChange}) => {
  return (
    <label>
      <input type='checkbox' checked={checked} onChange={onChange}/>
      {label}
    </label>
  )
}

export default Checkbox