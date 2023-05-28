const express = require('express');
const {
  getOrganisations,
  getOrganisation,
  createOrganisation,
  deleteOrganisation,
  updateOrganisation
} = require('../controllers/organisationController');

const router = express.Router();

//GET all organisations
router.get('/', getOrganisations);

//GET organisation by ID
router.get('/:id', getOrganisation);

//POST a new organisation
router.post('/', createOrganisation);

//DELETE organisation
router.delete('/:id', deleteOrganisation);

//UPDATE organisation
router.patch('/:id', updateOrganisation);

module.exports = router;