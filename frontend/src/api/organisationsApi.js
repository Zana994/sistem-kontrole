const apiRoute = '/api/organisations';

//GET all organisations
export const getAllOrganisations = async () => {
  try {
    const response = await fetch(apiRoute);

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
//GET organisation by ID
export const getOrganisationById = async (id) => {
  try {
    const response = await fetch(`${apiRoute}/${id}`);

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
//POST new organisation
export const addNewOrganisation = async (organisation) => {
  try {
    const response = await fetch(apiRoute, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(organisation)
    });
  
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
//DELETE organisation by ID
export const deleteOrganisationById = async (id) => {
  try {
    const response = await fetch(`${apiRoute}/${id}`, {
      method: 'DELETE'
    });
  
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
//UPDATE organisation by ID
export const updateOrganisationById = async (id, organisation) => {
  try {
    const response = await fetch(`${apiRoute}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(organisation)
    });
  
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}