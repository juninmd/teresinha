require('dotenv').config({ path: `./bin/env/${process.env.NODE_ENV || 'development'}.env` })
const notifier = require('node-notifier');

if (process.env.TERESAPATH == undefined) {
    notifier.notify({
        title: 'Teresinha',
        message: `Por favor, configure as variáveis de ambiente.`,
        sound: 'true',
        wait: false
    });
    return;
}

const path = require('path');
const os = require('os');

const github = require('./bin/api/github.js')();

async function check() {
    let t = await github.getTeresa();
    if (t.name == process.env.TERESAVERSION) {
        return;
    }

    let asset = getMyOsVersion(t.assets);
    let foto = await require('./bin/util/download')({
        directory: "./images/",
        filename: `${asset.uploader.login}.jpg`,
        url: asset.uploader.avatar_url
    });

    notifier.notify({
        title: `Teresinha`,
        message: `Novo executável do Teresa disponível!\nAutor: ${asset.uploader.login}\nVersão: ${t.tag_name}\nClique na notificação para atualizar.`,
        sound: 'true',
        icon: './images/teresinha.jpg',
        autor: foto,
        wait: true,
        downloadLink: asset.browser_download_url,
        filename: asset.filename,
        version: t.name
    });
}
check();

function getMyOsVersion(assets) {

    switch (os.type()) {
        case 'Windows_NT':
            return assets.filter(q => q.name.indexOf('windows') >= 0).filter(q => q.filename = 'teresa.exe')[0];
        case 'Linux':
            return assets.filter(q => q.name.indexOf('linux') >= 0).filter(q => q.filename = 'teresa')[0];
        default:
            return assets.filter(q => q.name.indexOf('darwin') >= 0).filter(q => q.filename = 'teresa')[0];
            break;
    }

}

notifier.on('click', async (notifierObject, options) => {

    try {
        let downloadTeresa = await require('./bin/util/download')({
            directory: process.env.TERESAPATH,
            filename: options.filename,
            url: options.downloadLink
        });

        process.env.TERESAVERSION = options.version;
        notifier.notify({
            title: options.title,
            message: `Atualizado com sucesso meu parça!`,
            sound: 'true',
            icon: options.autor,
            wait: false
        });
    } catch (error) {
        notifier.notify({
            title: 'ERRO',
            message: error.message,
            sound: 'true',
            icon: options.icon,
            wait: false
        });
    }
});

notifier.on('timeout', (notifierObject, options) => {
    // Triggers if `wait: true` and notification closes
});