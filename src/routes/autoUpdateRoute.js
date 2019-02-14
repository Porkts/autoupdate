const express = require('express')
const app = express()
const router = express.Router()

// Controller
const controller = require('../controllers/autoUpdateController')

// Rota
router.post('/', controller.post)

module.exports = router;