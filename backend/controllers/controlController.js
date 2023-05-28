const Control = require('../models/controlModel');
const mongoose = require('mongoose');
const { startOfDay, endOfDay } = require('date-fns');

//GET controls
const getControls = async (req, res) => {
  const controls = await Control.find({})
  .populate('organisation')
  .populate('product');

  res.status(200).json(controls);
}

//GET single control
const getControl = async (req, res) => {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'Control ID is invalid.'});
  }

  const control = await Control.findOne({ _id: id })
  .populate('organisation')
  .populate('product');

  if(!control) {
    return res.status(400).json({error: 'There is no control with the given ID.'});
  }

  res.status(200).json(control);
}

//POST control
const createControl = async (req, res) => {
  const { date, organisation, product, result, product_safety } = req.body;

  if(!mongoose.Types.ObjectId.isValid(organisation)) {
    return res.status(400).json({error: 'Selected organisation ID is invalid.'});
  }

  if(!mongoose.Types.ObjectId.isValid(product)) {
    return res.status(400).json({error: 'Selected product ID is invalid.'});
  }

  if(!organisation || !product || !result) {
    return res.status(400).json({error: 'All field must be filled.'});
  }

  try {
    let control = await Control.create({
      date,
      organisation,
      product,
      result,
      product_safety
    }).then(control => control.populate('organisation'))
    .then(control => control.populate('product'))


    res.status(200).json(control);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}

//DELETE control
const deleteControl = async ( req, res) => {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'Control ID is invalid.'});
  }

  const control = await Control.findOneAndDelete({ _id: id });

  if(!control) {
    return res.status(400).json({error: 'There is no control with the given ID.'});
  }

  res.status(200).json(control);
}

//UPDATE control
const updateControl = async (req, res) => {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'Control ID is invalid.'});
  }

  const control = await Control.findOneAndUpdate({ _id: id }, {
    ...req.body
  }, {returnOriginal: false})
  .populate('organisation')
  .populate('product');

  if(!control) {
    return res.status(400).json({error: 'There is no control with the given ID.'});
  }

  res.status(200).json(control);
}

//Filter control by date range and organisation name
const filterControl = async (req, res) => {
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  const name = req.query.organisation;
 
  const start = startOfDay(new Date(startDate));
  const end = endOfDay(new Date(endDate));

  try {
    const controls = await Control.find({ date : { $gte: start, $lte: end } })
    .populate('organisation', null, {
      name: name
    })
    .populate('product')
    .sort({ date: 1 })
    
    const result = controls.filter(control => control.organisation !== null)

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}

module.exports = {
  getControls,
  getControl,
  createControl,
  deleteControl,
  updateControl,
  filterControl
};