const Organisation = require('../models/organisationModel');
const mongoose = require('mongoose');

//GET organisations
const getOrganisations = async (req, res) => {
  const organisations = await Organisation.find();

  res.status(200).json(organisations);
}

//GET single organisation
const getOrganisation = async (req, res) => {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'Organisation ID is invalid.'});
  }

  const organisation = await Organisation.findOne({ _id: id });
  if(!organisation) {
    return res.status(400).json({error: 'There is no organisation with the given ID.'});
  }

  res.status(200).json(organisation);
}

//POST organisation
const createOrganisation = async (req, res) => {
  const { name, inspectorate, jurisdiction, contact } = req.body;

  if(!name || !inspectorate || !jurisdiction || !contact) {
    return res.status(400).json({error: 'All field must be filled.'});
  }

  try {
    const organisation = await Organisation.create({
      name,
      inspectorate,
      jurisdiction,
      contact
    });
    res.status(200).json(organisation);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}

//DLETE organisation
const deleteOrganisation = async ( req, res) => {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'Organisation ID is invalid.'});
  }

  const organisation = await Organisation.findOneAndDelete({ _id: id });

  if(!organisation) {
    return res.status(400).json({error: 'There is no organisation with the given ID.'});
  }

  res.status(200).json(organisation);
}

//UPDATE organisation
const updateOrganisation = async (req, res) => {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'Organisation ID is invalid.'});
  }

  const organisation = await Organisation.findOneAndUpdate({ _id: id }, {
    ...req.body
  }, {returnOriginal: false});

  if(!organisation) {
    return res.status(400).json({error: 'There is no organisation with the given ID.'});
  }

  res.status(200).json(organisation);
}

module.exports = {
  getOrganisations,
  getOrganisation,
  createOrganisation,
  deleteOrganisation,
  updateOrganisation
};