const os = require('os');
const sudo = require('sudo');
const command = require('../util/command');

async function setSudo() {
    return new Promise((resolve) => {

        if (os.type() === 'Windows_NT') {
            return resolve({});
        }

        const options = {
            cachePassword: true,
            prompt: '[sudo] Digite sua senha: ',
            spawnOptions: {}
        };
        const child = sudo(['ls', '-l', '/tmp', 'mv'], options);
        child.stdout.on('data', () => {
            return resolve({});
        });
    })
}

async function verifyInstalled() {
    return await command('teresa') == null;
}

function verifyVersion() {
    return new Promise((resolve, reject) => {
        nodecmd.get('teresa version', (err, data) => {
            if (err) {
                return resolve(err);
            }
            return resolve(data.replace('Version: ', '').trim());
        });
    })
}

async function setChmod(path) {
    return new Promise((resolve, reject) => {

        if (os.type() === 'Windows_NT') {
            return resolve({});
        }

        nodecmd.get(`sudo chmod 777 ${path}`, (err, data) => {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        });
    })
}

async function movePath(path, filename) {
    return new Promise((resolve, reject) => {

        let comando = '';
        switch (os.type()) {
            case 'Windows_NT':
                comando = `move '${path}\\${filename}' 'c:\\windows\\system32\\'`;
                break;
            default:
                comando = `sudo mv ${path}//${filename} /usr/local/bin/`;
                break;
        }
        nodecmd.get(comando, (err, data) => {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        });
    })
}

async function allApps() {
    const allApps = [];

    const rawApps = (await setCommand(`teresa app list`)).split('\n');

    for (const line of rawApps) {
        if (line[0] === '+') {
            continue;
        }

        if (line[0] === '|') {
            const app = line.split('|')[2].trim();
            if (app === 'APP') {
                continue;
            }
            allApps.push(app)
        }
    }

    return allApps;
}

module.exports = {
    setSudo,
    verifyInstalled,
    verifyVersion,
    setChmod,
    movePath,
    allApps
}