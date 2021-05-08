const express = require('express');
const router = express.Router();
const petController = require('../controllers/pet-controller');

//Pet routes
router.post('/', petController.post);

router.get('/', petController.getAll);

router.get('/:petId', petController.getById);

router.put('/:petId', petController.put);

router.delete('/:petId', petController.delete);

module.exports = router;