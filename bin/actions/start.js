const { allApps } = require('../util/teresa');
const command = require('../util/command');

module.exports = async () => {

    const promises = allApps().map(app => {
        return command(`teresa app start ${app}`);
    })

    return Promise.all(promises);
}