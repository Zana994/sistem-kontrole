
const Input = ({label, value, setFunction, type=null}) => {
  return (
    <div className='input-container'>
      <label>{label}</label>
      <input 
        className='input'
        type={`${type ? type : 'text'}`}
        value={value}
        onChange={(e) => setFunction(e.target.value)}
      />
    </div>
  )
}

export default Input;