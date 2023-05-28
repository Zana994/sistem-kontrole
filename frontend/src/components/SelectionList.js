
const SelectionList = ({label, value, setFunction, optionList, placeholder}) => {
  return (
    <div className='input-container'>
      <label>{label}</label>
      <select
        className='custom-select'
        value={value}
        onChange={(e) => setFunction(e.target.value)}
      >
        <option value={''} disabled>{placeholder}</option>
        {optionList && optionList.map(item => {
          if(item instanceof Object) {
            return (
              <option 
                key={Math.random()} 
                value={item?._id}
              >
                {item?.name}
              </option>
            )
          }
          return(
            <option 
              key={Math.random()} 
              value={item}
            >
              {item}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default SelectionList;