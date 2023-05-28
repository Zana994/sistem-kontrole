import { useState, useContext } from 'react';
//context
import { OrganisationContext } from '../context/OrganisationContext';
//api
import { 
  addNewOrganisation,
  deleteOrganisationById,
  updateOrganisationById
} from '../api/organisationsApi';
//components
import Display from '../components/Display';
import DeleteModal from '../components/DeleteModal';
import EditAddOrganisationModal from '../components/EditAddOrganisationModal';
import AddButton from '../components/AddButton';

const InspectionOrganisations = () => {
  const { organisations, dispatch } = useContext(OrganisationContext);
  const [organisationId, setOrganisationId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditAddModal, setShowEditAddModal] = useState(false);

  const handleAddNewOrganisation = async (organisation) => {
    const response = await addNewOrganisation(organisation);

    if(response && !response?.error) {
      dispatch({type: 'CREATE_ORGANISATION', payload: response});
      setOrganisationId(null);
    }
  }

  const handleDelete = async () => {
    const response = await deleteOrganisationById(organisationId);

    if(response && !response?.error) {
      dispatch({type: 'DELETE_ORGANISATION', payload: response});
      setOrganisationId(null);
      setShowDeleteModal(false);
    }
  }

  const handleEdit = async (organisation) => {
    const response = await updateOrganisationById(organisationId, organisation);

    if(response && !response?.error) {
      dispatch({type: 'UPDATE_ORGANISATION', payload: response});
      setOrganisationId(null);
    }
  }

  return (
    <div className="wrapper">
      <AddButton 
        title={'Dodaj inspekcijsko tijelo'}
        setId={setOrganisationId}
        setShowEditAddModal={setShowEditAddModal}
      />
      {organisations && organisations.map(organisation => {
        return(
          <Display
            key={Math.random()}
            id={organisation._id}
            setDataId={setOrganisationId}
            setShowDeleteModal={setShowDeleteModal}
            setShowEditModal={setShowEditAddModal}
          >
            <p><b>Naziv:</b> {organisation.name} </p>
            <p><b>Inspektorat:</b> {organisation.inspectorate} </p>
            <p><b>Nadležnost:</b> {organisation.jurisdiction} </p>
            <p><b>Kontakt osoba:</b> {organisation.contact} </p>
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
        <EditAddOrganisationModal 
          id={organisationId}
          addNewOrganisation={handleAddNewOrganisation}
          setShowEditAddModal={setShowEditAddModal}
          editOrganisation={handleEdit}
        />
      }
    </div>
  )
}

export default InspectionOrganisations;