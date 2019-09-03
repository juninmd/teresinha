const checkUpdate = require('./checkUpdate');
const download = require('./downloadTeresa');
const env = require('./env');
const start = require('./start');
const getAllEnvs = require('./getAllEnvs');

module.exports = {
    checkUpdate,
    download,
    env,
    start,
    getAllEnvs
}