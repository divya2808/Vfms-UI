const { Router } = require('express')
const proxy = require('./createProxyMiddleware')

const router = Router()

router.post(['/users', '/users/authenticate', '/users/create-directory', '/users/change-permissions', '/users/upload-file', '/quit'], proxy)

router.get(['/users/files'], proxy)

module.exports = router