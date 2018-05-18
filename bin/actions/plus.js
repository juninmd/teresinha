const nodecmd = require("node-cmd");
const fs = require("fs");

module.exports = {
    startAllApps: startAllApps,
    setConfigs: setConfigs
}

function setCommand(command) {
    console.log(`${command}`);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            nodecmd.get(command, (err, data, stderr) => {
                if (err) {
                    return reject(err);
                }
                return resolve(data);
            });
        }, 1000);
    })
}

async function startAllApps() {
    let allApps = [];

    let rawApps = (await setCommand(`teresa app list`)).split("\n");

    for (const line of rawApps) {
        if (line[0] === "+") {
            continue;
        }

        if (line[0] === "|") {
            let app = line.split("|")[2].trim();
            if (app === "APP") {
                continue;
            }
            allApps.push(app)
        }
    }

    let promises = allApps.map(app => {
        return setCommand(`teresa app start ${app}`);
    })

    return Promise.all(promises);
}

async function setConfigs(appName, path) {

    if(!fs.existsSync(path)){
        console.log(`${path} não foi encontrado`)
        return;
    }

    const allEnvs = fs.readFileSync(path).toString().split("\n").filter(q => q[0] != "#" && q != "");

    return runEnv(appName, allEnvs, 0);
};

async function runEnv(appName, allEnvs, i){

    if(allEnvs[i] == null)
        return undefined;

    await setCommand(`echo yes | teresa app env-set ${allEnvs[i]} --app ${appName}`);
    i++;

    return runEnv(appName, allEnvs, i);
}