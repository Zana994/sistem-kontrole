import { useContext, useState } from 'react';
//context
import { ControlContext } from '../context/ControlContext';
import { OrganisationContext } from '../context/OrganisationContext';
//api
import { filterControlsByDateAndName } from '../api/controlsApi';
import { getOrganisationById } from '../api/organisationsApi';
//dependencies
import { isFuture, isBefore } from 'date-fns';
//components
import SelectionList from './SelectionList';

const SearchControls = () => {
  const { dispatch } = useContext(ControlContext);
  const { organisations } = useContext(OrganisationContext);
  const [error, setError] = useState(false);
  const [organisationId, setOrganisationId] = useState('');
  const [dateForSearch, setDateForSearch] = useState({
    start: new Date(),
    end: new Date()
  });

  const fetchFilteredControls = async (start, end, organisationId) => {
    const organisation = await getOrganisationById(organisationId);
    const name = await organisation?.name;

    const response = await filterControlsByDateAndName(start, end, name);

    if(response && !response?.error) {
      dispatch({ type: 'SET_CONTROLS', payload: response });
      setError(null);
      //setOrganisationId('');
    }
  }

  const checkDatesValidation = (date1, date2) => {
    if(isFuture(date1) || isFuture(date2)) {
      setError('Unijeli ste datum u budućnosti!');
      return false;
    }
    else if(isBefore(date2, date1)) {
      setError('Niste unijeli validan vremenski period!');
      return false;
    }

    return true;
  }

  const handleSearch = () => {
    const start = new Date(dateForSearch.start);
    const end = new Date(dateForSearch.end);
    setError(null);

    if(!organisationId) {
      setError('Sva polja moraju biti popunjena.');
    }
    else if(checkDatesValidation(start, end)) {
      setError(null);
      fetchFilteredControls(start, end, organisationId);
    }
  }

  return (
    <div className='search-card'>
      <div>
        <label>Od: </label>
        <input 
          className='input search-input'
          type={'date'}
          value={dateForSearch.start}
          onChange={(e) => setDateForSearch(prev => ({...prev, start: e.target.value}))}
        /> 
        <label>Do: </label>
        <input 
          className='input search-input'
          type={'date'}
          value={dateForSearch.end}
          onChange={(e) => setDateForSearch(prev => ({...prev, end: e.target.value}))}
        />
      <button
        className="btn search-btn"
        onClick={() => handleSearch()}
      >
        Traži
      </button>
      <SelectionList
         label={'Inspekcijsko tijelo:'} 
         value={organisationId}
         setFunction={setOrganisationId}
         placeholder={'Izaberi inspekcijsko tijelo'}
         optionList={organisations}
      />
      {error &&
        <div className='error'>{error}</div>
      }
      </div>
    </div>
  )
}

export default SearchControls;