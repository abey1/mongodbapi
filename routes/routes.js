const express = require('express');
const router = express.Router()
const Model = require('../model/model')

//Post Method
router.post('/post', async (req, res) => {
  console.log(req);
  const data = new Model({
    name: req.body.name,
    age: req.body.age
  })
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

//Get all Method
router.get(`/getAll`, async (req, res) => {
  try {
    const allData = await Model.find({})
    res.json(allData)
  } catch (error) {
    res.status(500).json({ message: error })
  }
})

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
  try {
    const singleData = await Model.findById(req.params.id)
    res.status(200).json(singleData)
  } catch (error) {
    res.status(500).json({ message: error })
  }
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
  try {
    const id = req.params.id
    const options = { new: true }
    const updatedData = req.body
    const result = await Model.findByIdAndUpdate(id, updatedData, options)
    res.send(result)
  } catch (error) {
    res.status(500).json({ message: error })
  }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id
    const result = await Model.findByIdAndDelete(id)
    res.send(`Document with id of ${result.id} has been deleted`)
  } catch (error) {
    res.status(500).json({ message: error })
  }
})

module.exports = router;