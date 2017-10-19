const nodecmd = require('node-cmd');
const os = require('os');
const options = {
    name: 'Teresinha'
};

module.exports = () => {
    return {
        setSudo: setSudo,
        verifyInstalled: verifyInstalled,
        verifyVersion: verifyVersion,
        setChmod: setChmod,
        movePath: movePath
    }
}
async function setSudo() {
    return new Promise((resolve, reject) => {
        
        if (os.type() === "Windows_NT") {
            return resolve({});
        }
        
        let sudo = require('sudo');
        let options = {
            cachePassword: true,
            prompt: '[sudo] Digite sua senha',
            spawnOptions: { /* other options for spawn */ }
        };
        let child = sudo([ 'ls', '-l', '/tmp', 'mv' ], options);
        child.stdout.on('data', function (data) {
            return resolve({});
        });
    })
}

async function verifyInstalled() {
    return await new Promise((resolve, reject) => {
        nodecmd.get('teresa', (err, data, stderr) => {
            if (err) {
                return resolve(false);
            }
            return resolve(true);
        });
    })
}

async function verifyVersion() {
    return new Promise((resolve, reject) => {
        nodecmd.get('teresa version', (err, data, stderr) => {
            if (err) {
                return resolve(err);
            }
            return resolve(data.replace('Version: ', '').trim());
        });
    })
}

async function setChmod(path) {
    return new Promise((resolve, reject) => {
        
        if (os.type() === "Windows_NT") {
            return resolve({});
        }
        
        nodecmd.get(`sudo chmod 777 ${path}`, (err, data, stderr) => {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        });
    })
}

async function movePath(path, filename) {
    return new Promise((resolve, reject) => {
        
        let comando = "";
        switch (os.type()) {
            case "Windows_NT":
            comando = `move "${path}\\${filename}" "c:\\windows\\system32\\"`;
            break;
            case "Linux":
            comando = `sudo mv ${path}//${filename} /usr/local/bin/`;
            break;
            default:
            comando = `sudo mv ${path}//${filename} /usr/local/bin/`;
            break;
        }
        nodecmd.get(comando, (err, data, stderr) => {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        });
    })
}