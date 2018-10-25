const nodecmd = require('node-cmd');
const fs = require('fs');

module.exports = async (appName, path) => {
    if (!fs.existsSync(path)) {
        console.log(`${path} não foi encontrado`)
        return;
    }
    const allEnvs = fs.readFileSync(path).toString().split('\n').filter(q => q[0] != '#' && q != '');
    return runEnv(appName, allEnvs);
};

async function runEnv(appName, allEnvs) {
    if (allEnvs[0] == null)
        return undefined;

    await setCommand(`teresa app env-set ${allEnvs.join(', ')} --app ${appName} --no-input`);
}

function setCommand(command) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            nodecmd.get(command, (err, data) => {
                if (err) {
                    return reject(err);
                }
                return resolve(data);
            });
        }, 1000);
    })
}
