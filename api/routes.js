const { Router } = require('express')
const proxy = require('./createProxyMiddleware')

const router = Router()

router.post(['/users', '/users/authenticate'], proxy)


module.exports = router