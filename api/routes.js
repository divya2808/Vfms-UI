const { Router } = require('express')
const proxy = require('./createProxyMiddleware')

const router = Router()

router.post(['/users'], proxy)

module.exports = router