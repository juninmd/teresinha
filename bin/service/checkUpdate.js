const notifier = require('node-notifier');
const github = require('../api/github.js')();
const getMyOsVersion = require('../util/getMyOsAsset')
const path = require('path');
const cmd = require('node-cmd');

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

async function check() {
    let t = await github.getTeresa();
    if (t.documentation_url) {
        console.error("Verifique seu token.");
        process.exit(1);
        return;
    }

    let teresaExist = await verifyInstalled();
    if (teresaExist) {
        if (t.name == await verifyVersion()) {
            return;
        }
    }

    let asset = getMyOsVersion(t.assets);

    notifier.notify({
        title: `Teresinha`,
        message: `Novo executável do Teresa disponível!\nAutor: ${asset.uploader.login}\nVersão: ${t.tag_name}\nAtualize com o comando: $ teresinha`,
        sound: 'true',
        icon: path.join(__dirname, `./images/teresinha.jpg`),
        wait: true
    });
}

module.exports = () => {
    return check();
}