const express = require('express');
const { currentUser,registerUser,loginUser } = require('../controllers/userController');
const validateToken = require('../middleware/validateTokenhandler')
const router = express.Router();

router.post("/register",registerUser)
router.post("/login",loginUser)


router.get("/current",validateToken,currentUser);


module.exports = router