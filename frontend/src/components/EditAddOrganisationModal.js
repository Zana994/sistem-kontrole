import { useEffect, useState } from 'react';
//api
import { getOrganisationById } from '../api/organisationsApi';
//components
import ModalWrapper from './ModalWrapper';
import Input from './Input';
import SelectionList from './SelectionList';

const EditAddOrganisationModal = ({
  id = null,
  setShowEditAddModal,
  addNewOrganisation,
  editOrganisation 
}) => {
  const [name, setName] = useState('');
  const [inspectorate, setInspectorate] = useState('');
  const [jurisdiction, setJurisdiction] = useState('');
  const [contact, setContact] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      const response = await getOrganisationById(id);

      if(response && !response?.error) {
        setName(response.name);
        setInspectorate(response.inspectorate);
        setJurisdiction(response.jurisdiction);
        setContact(response.contact);
      }
    }

    if(id) {
      getProduct();
    }
  }, [])
  
  const handleSubmit = () => {
    const organisation = {name, inspectorate, jurisdiction, contact};

    if(!name || !inspectorate || !jurisdiction || !contact) {
      setError('Sva polja moraju biti popunjena!');
    }
    else if(id) {
      setError(null);
      editOrganisation(organisation);
      setShowEditAddModal(false);
    }
    else {
      setError(null);
      addNewOrganisation(organisation);
      setShowEditAddModal(false);
    }
  }

  return (
    <ModalWrapper
      setShowEditAddModal={setShowEditAddModal}
      submitFunction={handleSubmit}
    >
      <Input 
        label={'Naziv inspekcijskog tijela:'}
        value={name}
        setFunction={setName}
      />
      <SelectionList 
        label={'Inspektorat:'}
        value={inspectorate}
        setFunction={setInspectorate}
        placeholder={'Izaberi inspektorat'}
        optionList={['FBiH', 'RS', 'Brčko Distrikt']}
      />
      <SelectionList 
        label={'Nadležnost:'}
        value={jurisdiction}
        setFunction={setJurisdiction}
        placeholder={'Izaberi nadležnost'}
        optionList={['Tržišna inspekcija', 'Zdravstveno-sanitarna inspekcija']}
      />
      <Input 
        label={'Kontakt osoba:'}
        value={contact}
        setFunction={setContact}
      />
      {error &&
        <div className='error'>{error}</div>
      }
    </ModalWrapper>
  )
}

export default EditAddOrganisationModal;