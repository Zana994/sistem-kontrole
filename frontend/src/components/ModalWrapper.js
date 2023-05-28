
const ModalWrapper = ({setShowEditAddModal, submitFunction, children}) => {
  return (
    <div className="modal">
      <div className="modal-content-wrapper">
        {children}
        <div className="btn-modal-wrapper">
          <button 
            className="btn" 
            onClick={() => setShowEditAddModal(false)}
          >
            Odustani
          </button>
          <button 
            className="btn" 
            onClick={() => submitFunction()}
          >
            Spasi
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalWrapper;