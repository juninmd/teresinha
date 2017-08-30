const notifier = require('node-notifier');
const github = require('./bin/api/github.js')();
const getMyOsVersion = require('./bin/util/getMyOsAsset')
const path = require('path');

async function check() {
    if (process.env.TERESAPATH == undefined || process.env.GITHUBTOKEN == undefined) {
        notifier.notify({
            title: 'Teresinha',
            message: `Por favor, configure as variáveis de ambiente.`,
            sound: 'true',
            wait: false
        });
        return;
    }
    
    let t = await github.getTeresa();
    if (t.name == process.env.TERESAVERSION) {
        return;
    }
    
    let asset = getMyOsVersion(t.assets);
    
    notifier.notify({
        title: `Teresinha`,
        message: `Novo executável do Teresa disponível!\nAutor: ${asset.uploader.login}\nVersão: ${t.tag_name}\nAtualize com o comando: $ teresinha`,
        sound: 'true',
        icon: path.join(__dirname,`./images/teresinha.jpg`),
        wait: true
    });
}

module.exports = () =>{
    return check();
}