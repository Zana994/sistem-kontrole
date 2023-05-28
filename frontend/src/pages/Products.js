import { useState, useContext } from 'react';
//api
import { 
  addNewProduct, 
  deleteProductById, 
  updateProductById 
} from '../api/productsApi';
//components
import EditAddProductModal from '../components/EditAddProductModal';
import Display from '../components/Display';
import DeleteModal from '../components/DeleteModal';
import AddButton from '../components/AddButton';
//context
import { ProductContext } from '../context/ProductContext';

const Products = () => {
  const { products, dispatch } = useContext(ProductContext);
  const [showEditAddModal, setShowEditAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productId, setProductId] = useState(null);

  const handleDelete = async () => {
    const response = await deleteProductById(productId);

    if(response && !response?.error) {
      dispatch({type: 'DELETE_PRODUCT', payload: response});
      setShowDeleteModal(false);
      setProductId(null);
    }
  }

  const handleAddNewProduct = async (product) => {
    const response = await addNewProduct(product);

    if(response && !response?.error) {
      dispatch({type: 'CREATE_PRODUCT', payload: response});
      setProductId(null);
    }
  }

  const handleEdit = async (newProduct) => {
    const response = await updateProductById(newProduct, productId);

    if(response && !response?.error) {
      dispatch({type: 'UPDATE_PRODUCT', payload: response});
      setProductId(null);
    }
  }
 
  return (
    <div className='wrapper'>
      <AddButton 
        title={'Dodaj novi proizvod'}
        setId={setProductId}
        setShowEditAddModal={setShowEditAddModal}
      />
      {products && products.map(product => {
        return (
          <Display
            key={Math.random()}
            id={product._id}
            setShowDeleteModal={setShowDeleteModal}
            setDataId={setProductId}
            setShowEditModal={setShowEditAddModal}
          >
            <p><b>Naziv: </b> {product.name} </p>
            <p><b>Proizvođač: </b> {product.manufacturer} </p>
            <p><b>Serijski broj: </b> {(product.serial_number) ? product.serial_number : '/'} </p>
            <p><b>Zemlja porijekla: </b> {product.country_of_origin} </p>
            <p><b>Opis: </b> {(product.description) ? product.description : '/'} </p>
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
        <EditAddProductModal 
          id={productId}
          setShowEditAddModal={setShowEditAddModal} 
          addNewProduct={handleAddNewProduct}
          editProduct={handleEdit}
        /> 
      }
    </div>
  )
}

export default Products;