const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client-controller');

//Client routes
router.post('/', clientController.post);

router.get('/', clientController.getAll);

router.get('/:clientId', clientController.getById);

router.put('/:clientId', clientController.put);

router.delete('/:clientId', clientController.delete);

module.exports = router;