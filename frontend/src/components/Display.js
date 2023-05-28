import { useState } from 'react';
//components
import DetailsModal from "./DetailsModal";

const Display = ({
  id, 
  setDataId, 
  children, 
  setShowDeleteModal, 
  setShowEditModal,
  detailsOption=false,
  data=null
}) => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  return (
    <>
      <div className="display-container">
        <div>
          {children}
        </div>
        <div className='button-container'>
          <button 
            className='btn' 
            onClick={() => {
              setShowEditModal(true);
              setDataId(id);
            }}
          >
            Uredi
          </button>
          <button 
            className='btn'
            onClick={() => {
              setShowDeleteModal(true);
              setDataId(id);
            }} 
          >
            Izbriši
          </button>
          {detailsOption &&
            <button
              className="btn"
              onClick={() =>setShowDetailsModal(true)}
            >
              Odaberi
            </button>
          }
          {showDetailsModal &&
            <DetailsModal 
              data={data}
              setShowDetailsModal={setShowDetailsModal}
            />
          }
        </div>
      </div>
    </>
  )
}

export default Display;