const checkUpdate = require('./checkUpdate');
const download = require('./downloadTeresa');
const env = require('./env');
const start = require('./start');
const getAllEnvs = require('./getAllEnvs');
const setAllEnvs = require('./setAllEnvs');

module.exports = {
    checkUpdate,
    download,
    env,
    start,
    getAllEnvs,
    setAllEnvs
}