import { useState, useContext } from 'react';
//dependencies
import { format } from 'date-fns';
//context
import { ControlContext } from '../context/ControlContext';
//components
import EditAddControlModal from '../components/EditAddControlModal';
import DeleteModal from '../components/DeleteModal';
import Display from '../components/Display';
import SearchControls from '../components/SearchControls';
import AddButton from '../components/AddButton';
//api
import { 
  addNewControl, 
  deleteControlById,
  updateControlById 
} from '../api/controlsApi';

const InspectionControls = () => {
  const { controls, dispatch } = useContext(ControlContext);
  const [showEditAddModal, setShowEditAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [controlId, setControlId] = useState(null);

  const handleAddNewControl = async (control) => {
    const response = await addNewControl(control);

    if(!response?.error) {
      dispatch({type: 'CREATE_CONTROL', payload: response});
      setShowEditAddModal(false);
    }
  }

  const handleDelete = async () => {
    const response = await deleteControlById(controlId);

    if(!response?.error) {
      dispatch({type: 'DELETE_CONTROL', payload: response});
      setControlId(null);
      setShowDeleteModal(false);
    }
  }

  const handleEdit = async (control) => {
    const response = await updateControlById(controlId, control);

    if(response && !response?.error) {
      dispatch({type: 'UPDATE_CONTROL', payload: response});
      setControlId(null);
      setShowEditAddModal(false);
    }
  }

  return (
    <div className='wrapper'>
      <div className='search-button-container'>
        <AddButton 
          title={'Dodaj inspekcijsku kontrolu'}
          setId={setControlId}
          setShowEditAddModal={setShowEditAddModal}
        />
        <SearchControls />
      </div>
      {controls && controls.map(control => {
        return(
          <Display
            key={Math.random()}
            id={control._id}
            setDataId={setControlId}
            setShowDeleteModal={setShowDeleteModal}
            setShowEditModal={setShowEditAddModal}
            data={control}
            detailsOption={true}
          >
            <p><b>Datum:</b> {format(new Date(control.date), 'dd.MM.yyyy')} </p>
            <p><b>Nadležno tijelo:</b> {control.organisation?.name} </p>
            <p><b>Kontrolisani proizvod:</b> {control.product?.name} </p>
            <p><b>Rezultat kontrole:</b> {control.result} </p>
            <p><b>Proizvod siguran:</b> {(control.product_safety) ? 'Da' : 'Ne'} </p>
          </Display>
        )
      })}
      {showDeleteModal &&
        <DeleteModal 
          setShowDeleteModal={setShowDeleteModal}
          deleteFunction={handleDelete}
        />
      }
      {showEditAddModal &&
        <EditAddControlModal 
          id={controlId}
          setShowEditAddModal={setShowEditAddModal}
          addNewControl={handleAddNewControl}
          editControl={handleEdit}
        />
      }
    </div>
  )
}

export default InspectionControls;