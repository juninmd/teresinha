const os = require('os');
const sudo = require('sudo');
const command = require('../util/command');

async function setSudo() {

    if (os.type() === 'Windows_NT') {
        return {};
    }

    const options = {
        cachePassword: true,
        prompt: '[sudo] Digite sua senha: ',
        spawnOptions: {}
    };
    const child = sudo(['ls', '-l', '/tmp', 'mv'], options);
    child.stdout.on('data', () => {
        return {};
    });
}

async function verifyInstalled() {
    return await command('teresa') == null;
}

async function verifyVersion() {
    const data = await command(`teresa version`);
    return data.replace('Version: ', '').trim();
}

async function setChmod(path) {
    if (os.type() === 'Windows_NT') {
        return {}
    }
    return await command(`sudo chmod 777 ${path}`);
}

async function movePath(path, filename) {
    let comando = '';
    switch (os.type()) {
        case 'Windows_NT':
            comando = `move '${path}\\${filename}' 'c:\\windows\\system32\\'`;
            break;
        default:
            comando = `sudo mv ${path}//${filename} /usr/local/bin/`;
            break;
    }
    return await command(comando);
}

async function allApps() {
    const allApps = [];

    const rawApps = (await command(`teresa app list`)).split('\n');

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

async function getEnvVars(app) {
    const envVars = {
        app,
        envs: []
    };

    const rawInfo = (await command(`teresa app info ${app}`)).split('\n');

    let envs = false;
    for (const line of rawInfo) {

        if (line === 'env vars:') {
            envs = true;
            continue;
        }

        if (envs === false) {
            continue;
        }

        if (line === 'status:') {
            break;
        }

        envVars.envs.push(line.trim());
    }

    return envVars;
}

module.exports = {
    setSudo,
    verifyInstalled,
    verifyVersion,
    setChmod,
    movePath,
    allApps,
    getEnvVars
}