const express = require('express');
const router = express.Router();

const {
  getAllClients,
  getClient,
  createClient,
  updateClient,
  deleteClient,
} = require('../controllers/clients');

router.route('/').post(createClient).get(getAllClients);
router.route('/:id').get(getClient).delete(deleteClient).patch(updateClient);

module.exports = router;
