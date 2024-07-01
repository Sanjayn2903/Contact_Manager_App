const express = require('express')
const router = express.Router()
const {getContact,createContact, deleteContact, updateContact,getContacts} = require('../controllers/contactController');
const validateToken = require('../middleware/validateTokenhandler');
router.use(validateToken)
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).delete(deleteContact).put(updateContact)



module.exports = router;