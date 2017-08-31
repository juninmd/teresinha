const notifier = require('node-notifier');
const github = require('./bin/api/github.js')();
const path = require('path')
const download = require('./bin/util/download');

async function download() {
    try {
        let t = await github.getTeresa();

        let asset = getMyOsVersion(t.assets);

        let downloadTeresa = await download({
            directory: 'D://',
            filename: asset.filename,
            url: asset.downloadLink
        });

        notifier.notify({
            title: 'Teresinha',
            message: `Atualizado com sucesso meu parça!`,
            sound: 'true',
            icon: path.join(__dirname, `./images/teresinha.jpg`),
            wait: false
        });
    } catch (error) {
        notifier.notify({
            title: 'Teresinha',
            message: error.message,
            sound: 'true',
            icon: path.join(__dirname, `./images/teresinha.jpg`),
            wait: false
        });
    }
}

module.exports = () => {
    return download();
}