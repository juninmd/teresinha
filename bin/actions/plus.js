const nodecmd = require("node-cmd");
const fs = require("fs");

module.exports = {
    startAllApps: startAllApps,
    setConfigs: setConfigs
}

function setCommand(command) {
    return new Promise((resolve, reject) => {
        nodecmd.get(command, (err, data, stderr) => {
            console.log(`${command}\n${err}\n${data}\n${stderr}`);
            if (err) {
                return reject(err);
            }
            return resolve(data);
        });
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

    const allEnvs = fs.readFileSync(path).toString().split("\r\n").filter(q => q[0] != "#" && q != "");

    const promises = allEnvs.map(env => {
        return setCommand(`echo yes | teresa app env-set ${env} --app ${appName}`);
    })

    return Promise.all(promises);
};