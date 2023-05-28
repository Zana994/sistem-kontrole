const express = require('express');
const {
  getControls,
  getControl,
  createControl,
  deleteControl,
  updateControl,
  filterControl
}  = require('../controllers/controlController');

const router = express.Router();

//GET all controls
router.get('/', getControls);


//FILTER control by date
// /api/controls/filter?startDate=x&endDate=y&organisation=z
router.get('/filter', filterControl);

//GET control by ID
router.get('/:id', getControl);

//POST new control
router.post('/', createControl);


//DELETE control
router.delete('/:id', deleteControl);

//UPDATE control
router.patch('/:id', updateControl); 

module.exports = router;