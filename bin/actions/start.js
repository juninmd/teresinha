const { allApps } = require('../util/teresa');

module.exports = async () => {

    const promises = allApps().map(app => {
        return setCommand(`teresa app start ${app}`);
    })

    return Promise.all(promises);
}