const apiRoute = 'http://localhost:4000/api/products';

// GET all products
export const getAllProducts = async () => {
  try {
    const response = await fetch(apiRoute);

    return await response.json();
  } catch(error) {
    console.error(error);
  }
} 
//GET product by ID
export const getProductById = async (id) => {
  try {
    const response = await fetch(`${apiRoute}/${id}`);

    return await response.json();
  } catch(error) {
    console.error(error);
  }
}
//DELETE product by ID
export const deleteProductById = async (id) => {
  try {
    const response = await fetch(`${apiRoute}/${id}`, {
      method: 'DELETE'
    });
  
    return await response.json();
  } catch(error) {
    console.error(error);
  }
}
//UPDATE product by ID
export const updateProductById = async (product, id) => {
  try {
    const response = await fetch(`${apiRoute}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    });
  
    return await response.json();
  } catch(error) {
    console.error(error);
  }
}
//POST new product
export const addNewProduct = async (product) => {
  try {
    const response = await fetch(apiRoute, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    });
  
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}