import { useContext, useEffect, useState } from 'react';
//api
import { getControlById } from '../api/controlsApi';
//context
import { ProductContext } from '../context/ProductContext';
import { OrganisationContext } from '../context/OrganisationContext';
//dependencies
import { format, isFuture } from 'date-fns';
//components
import ModalWrapper from './ModalWrapper';
import Input from './Input';
import SelectionList from './SelectionList';

const EditAddControlModal = ({
  id,
  setShowEditAddModal,
  addNewControl,
  editControl
}) => {
  const { products } = useContext(ProductContext);
  const { organisations } = useContext(OrganisationContext);
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd HH:mm'));
  const [organisation, setOrganisation] = useState('');
  const [product, setProduct] = useState('');
  const [result, setResult] = useState('');
  const [productSafety, setProductSafety] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const setFormforEdit = async () => {
      const response = await getControlById(id);
  
      if(response && !response?.error) {
        setDate(format(new Date(response.date), 'yyyy-MM-dd HH:mm'));
        setOrganisation(response.organisation._id);
        setProduct(response.product._id);
        setResult(response.result);
        setProductSafety(response.product_safety);
      }
    }
    
    if(id) {
      setFormforEdit();
    }
  }, [])

  const handleSubmit = () => {
    setError(null);
    const newControl = {
      date,
      organisation, 
      product,
      result,
      productSafety
    }; 
     
    if(!organisation || !product || !result) {
      setError('Sva polja moraju biti popunjena!');
    }
    else if(isFuture(new Date(date))) {
      setError('Unijeli ste datum koji nije validan!');
    }
    else if(id) {
      setError(null);
      editControl(newControl);
    }
    else {
      setError(null);
      addNewControl(newControl);
    }
  }

  return (
    <ModalWrapper
      setShowEditAddModal={setShowEditAddModal}
      submitFunction={handleSubmit}
    >
      <Input 
        label={'Datum inspekcijske kontrole:'}
        value={date}
        setFunction={setDate}
        type={'datetime-local'}
      />
      <SelectionList 
         label={'Nadležno inspekcijsko tijelo:'}
         value={organisation}
         setFunction={setOrganisation}
         optionList={organisations}
         placeholder={'Izaberi nadležno tijelo'}
      />
      <SelectionList 
        label={'Kontrolisani proizvod:'}
        value={product}
        setFunction={setProduct}
        optionList={products}
        placeholder={'Izaberi proizvod'}
        />
      <div className='input-container'>
        <label>Rezultati kontrole (tekstualni opis):</label>
        <textarea
          className='input'
          value={result} 
          onChange={(e) => setResult(e.target.value)}
        />
      </div>
 
      <div className='input-container'>
        <label>Proizvod siguran:</label>
        <label> Da
          <input 
            className='checkbox'
            type={'checkbox'}
            name='safe'
            checked={productSafety}
            onChange={() => setProductSafety(prev => !prev)}
          />
        </label>
        <label> Ne
          <input 
            className='checkbox'
            type={'checkbox'}
            checked={!productSafety}
            onChange={() => setProductSafety(prev => !prev)}
          />
        </label>
      </div>
      {error &&
        <div className='error'>{error}</div>
      }
    </ModalWrapper>
  )
}

export default EditAddControlModal;