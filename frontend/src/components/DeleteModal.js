
const DeleteModal = ({ setShowDeleteModal, deleteFunction }) => {
  return (
    <div className="modal">
      <div className="modal-content-wrapper">
        <p>Da li ste sigurni da želite obrisati ovaj proizvod?</p>
        <div className="btn-modal-wrapper">
          <button 
            className="btn" 
            onClick={() => deleteFunction()}
          >
            Da
          </button>
          <button 
            className="btn" 
            onClick={() => setShowDeleteModal(false)}
          >
            Ne
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal;