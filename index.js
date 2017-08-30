require('dotenv').config({ path: `./bin/env/${process.env.NODE_ENV || 'development'}.env` })

const checkUpdate = require('./checkUpdate');
checkUpdate();