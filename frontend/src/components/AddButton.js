
const AddButton = ({title, setId, setShowEditAddModal}) => {
  return (
    <div>
      <button 
        className='btn' 
        onClick={() => {
          setId(null);
          setShowEditAddModal(true);
        }}
      > 
        {title} 
      </button>
    </div>
  )
}

export default AddButton;