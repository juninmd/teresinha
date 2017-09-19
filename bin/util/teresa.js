const cmd = require('node-cmd');
const os = require('os');

module.exports = () => {
    return {
        verifyInstalled: verifyInstalled,
        verifyVersion: verifyVersion,
        setChmod: setChmod,
        movePath: movePath
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
        cmd.get('teresa version', (err, data, stderr) => {
            if (err) {
                return resolve(err);
            }
            return resolve(data.replace('Version: ','').trim());
        });
    })
}

async function setChmod(path) {
    return new Promise((resolve, reject) => {
        
        if(os.type() == "Windows_NT"){
            return resolve({});
        }
        
        cmd.get(`chmod 777 ${path}`, (err, data, stderr) => {
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
            comando = `mv ${path}\\${filename} c:\\windows\\system32\\`;
            break;
            case "Linux":
            comando = `mv ${path}//${filename} /usr/local/bin/`;
            break;
            default:
            comando = `mv ${path}//${filename} /usr/local/bin/`;
            break;
        }
        cmd.get(comando, (err, data, stderr) => {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        });
    })
}