const notifier = require('node-notifier');
const github = require('./bin/api/github.js')();

async function download() {
    try {
        let t = await github.getTeresa();
        if (t.name == process.env.TERESAVERSION) {
            return;
        }
        
        let asset = getMyOsVersion(t.assets);
        
        let downloadTeresa = await require('./bin/util/download')({
            directory: process.env.TERESAPATH,
            filename: asset.filename,
            url: asset.downloadLink
        });
        
        process.env.TERESAVERSION = asset.version;
        notifier.notify({
            title: 'Teresinha',
            message: `Atualizado com sucesso meu parça!`,
            sound: 'true',
            icon: './images/teresinha.jpg',
            wait: false
        });
    } catch (error) {
        notifier.notify({
            title: 'Teresinha',
            message: error.message,
            sound: 'true',
            icon: './images/teresinha.jpg',
            wait: false
        });
    }
}

module.exports = () =>{
    return download();
}