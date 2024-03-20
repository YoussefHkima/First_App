const express = require('express')
const router = express.Router()
const pdtController = require("../controllers/pdtController")
const upload = require('../middleware/upload')

router.post('/cat', pdtController.addCategory)
router.post("/:id", upload.single('img'), pdtController.add)
router.get('/', pdtController.getAll)
router.put('/:id', upload.single('img'), pdtController.modify)
router.get('/:id', pdtController.getOne)
router.delete('/:id', pdtController.remove)

module.exports = router