//const apiRoute= 'http://localhost:4000/api/controls';
const apiRoute= 'https://sistem-kontrole-backend.vercel.app/api/controls';

//GET all cotrols
export const getAllControls = async () => {
  try {
    const response = await fetch(apiRoute);

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
//GET control by ID
export const getControlById = async (id) => {
  try {
    const response = await fetch(`${apiRoute}/${id}`);

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
//Filter controls by date and organisation name
export const filterControlsByDateAndName = async (start, end, name) => {
  try {
    const response = await fetch(`${apiRoute}/filter?startDate=${start}&endDate=${end}&organisation=${name}`);

    return await response.json();  
  } catch (error) {
    console.error(error);
  }
}
//POST control
export const addNewControl = async (control) => {
  const {
    date,
    organisation,
    product,
    result,
    productSafety: product_safety
  } = control;

  try {
    const response = await fetch(apiRoute, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({date, organisation, product, result, product_safety})
    });

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
//DELETE control
export const deleteControlById = async (id) => {
  try {
    const response = await fetch(`${apiRoute}/${id}`, {
      method: 'DELETE'
    });
  
    return await response.json(); 
  } catch (error) {
    console.error(error);
  }
}
//UPDATE control
export const updateControlById = async (id, control) => {
  const {
    date,
    organisation,
    product,
    result,
    productSafety: product_safety
  } = control;

  try {
    const response = await fetch(`${apiRoute}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({date, organisation, product, result, product_safety})
    });
  
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}