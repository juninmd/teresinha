const cmd = require('node-cmd');
const os = require('os');

module.exports = () => {
    return {
        verifyInstalled: verifyInstalled,
        verifyVersion: verifyVersion,
        setChmod: setChmod
    }
}


async function verifyInstalled() {
    return await new Promise((resolve, reject) => {
        cmd.get('teresa', (err, data, stderr) => {
            if (err) {
                return resolve(false);
            }
            return resolve(true);
        });
    })
}

async function verifyVersion() {
    return new Promise((resolve, reject) => {
        cmd.get('teresa -v', (err, data, stderr) => {
            if (err) {
                return resolve(err);
            }
            return resolve(data);
        });
    })
}

async function setChmod(path) {
    return new Promise((resolve, reject) => {

        if(os.type() == "Windows_NT"){
            return resolve({});
        }
        
        cmd.get(`chmod +777 ${path}`, (err, data, stderr) => {
            if (err) {
                return resolve(err);
            }
            return resolve(data);
        });
    })
}