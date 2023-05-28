import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useContext } from 'react';
// style
import './App.css';
//components
import Header from './components/Header';
// pages
import Home from './pages/Home';
import Products from './pages/Products';
import InspectionOrganisations from './pages/InspectionOrganisations';
import InspectionControls from './pages/InspectionControls';
//context
import { ProductContext } from './context/ProductContext';
import { OrganisationContext } from './context/OrganisationContext';
import { ControlContext } from './context/ControlContext';
//api
import { getAllProducts } from './api/productsApi';
import { getAllOrganisations } from './api/organisationsApi';
import { getAllControls } from './api/controlsApi';

function App() {
  const { dispatch: productsDispatch } = useContext(ProductContext);
  const { dispatch: organisationsDispatch } = useContext(OrganisationContext);
  const { dispatch: controlsDispatch } = useContext(ControlContext);

  useEffect(() => {
    const fetchData = async () => {
      const productsData = await getAllProducts();
      const organisationsData = await getAllOrganisations();
      const controlsData = await getAllControls();

      if(productsData && !productsData?.error) {
        productsDispatch({type: 'SET_PRODUCTS', payload: productsData});
      }
      if(organisationsData && !organisationsData?.error) {
        organisationsDispatch({type: 'SET_ORGANISATIONS', payload: organisationsData});
      }
      if(controlsData && !controlsData?.error) {
        controlsDispatch({type: 'SET_CONTROLS', payload: controlsData});
      }
    }
    fetchData();

  }, []);

  return (
    <div className="App">
      <Router>
        <Header />
        <div className='container'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/proizvodi' element={<Products />} />
            <Route path='/inspekcijska-tijela' element={<InspectionOrganisations />} />
            <Route path='/inspekcijska-kontrola' element={<InspectionControls />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
