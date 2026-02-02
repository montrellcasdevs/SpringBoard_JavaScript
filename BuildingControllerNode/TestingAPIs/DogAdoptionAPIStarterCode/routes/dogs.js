const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const dogsCtrl = require('../controllers/dogs');

// Register a dog
router.post('/', auth, dogsCtrl.registerDog);

// Adopt a dog
router.post('/:id/adopt', auth, dogsCtrl.adoptDog);

// Remove a dog
router.delete('/:id', auth, dogsCtrl.removeDog);

// List dogs registered by the authenticated user (filter by status and paginate)
router.get('/my', auth, dogsCtrl.listRegisteredDogs);

// List dogs adopted by the authenticated user (paginate)
router.get('/adopted', auth, dogsCtrl.listAdoptedDogs);

module.exports = router;
