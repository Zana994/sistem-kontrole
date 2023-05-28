import { useEffect, useState } from 'react';
//api
import { getProductById } from '../api/productsApi';
//components
import ModalWrapper from './ModalWrapper';
import Input from './Input';
/**
 * 
 * @param {ObjectId} id Id of the selected product to edit
 * @param {Function} setShowEditAddModal open/close modal (Boolean value) 
 * @param {Function} editProduct makes the API call to edit product
 * @param {Function} addNewProduct makes the API call to add new product
 * 
 */

const EditAddProductModal = ({ 
  id, 
  setShowEditAddModal, 
  editProduct, 
  addNewProduct
}) => {

  const [product, setProduct] = useState({
    name: '',
    manufacturer: '',
    serial_number: '',
    country_of_origin: '',
    description: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      const response = await getProductById(id);

      if(response && !response?.error) {
        setProduct(response);
      }
    }

    if(id) {
      getProduct();
    }
  }, [])

  const handleSubmit = () => {
    
    if(!product.name || !product.manufacturer || !product.country_of_origin) {
      setError('Sva polja označena * moraju biti popunjena!');
    }
    else if(id) {
      setError(null);
      editProduct(product);
      setShowEditAddModal(false);
    }
    else {
      setError(null);
      addNewProduct(product);
      setShowEditAddModal(false);
    }
  }

  return (
    <ModalWrapper
      setShowEditAddModal={setShowEditAddModal}
      submitFunction={handleSubmit}
    >
      <Input 
        label={'Naziv proizvoda* :'}
        value={product.name}
        setFunction={(e) => {setProduct((prev) => ({...prev, name: e}))}}
      />
      <Input 
        label={'Proizvođač* :'}
        value={product.manufacturer}
        setFunction={(e) => {setProduct((prev) => ({...prev, manufacturer: e}))}}
      />
      <Input 
        label={'Serijski broj (opcionalno) :'}
        value={product.serial_number}
        setFunction={(e) => {setProduct((prev) => ({...prev, serial_number: e}))}}
      />
      <Input 
        label={'Zemlja porijekla* :'}
        value={product.country_of_origin}
        setFunction={(e) => {setProduct((prev) => ({...prev, country_of_origin: e}))}}
      />
      <div className='input-container'>
        <label>Opis (opcionalno) :</label>
        <textarea
          className='input'
          value={product.description} 
          onChange={(e) => setProduct((prev) => ({...prev, description: e.target.value}))}
        />
      </div>
      {error &&
        <div className='error'>{error}</div>
      }
     </ModalWrapper>
  )
}

export default EditAddProductModal;