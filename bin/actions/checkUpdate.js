const github = require('../api/github.js')();
const getMyOsVersion = require('../util/getMyOsAsset')
const teresa = require('../util/teresa')()

async function check() {
    let t = await github.getTeresa();
    if (t.documentation_url) {
        console.error("Token Inválido.");
        process.exit(1);
        return;
    }
    
    let teresaExist = await teresa.verifyInstalled();
    if (teresaExist) {
        if (t.name == await teresa.verifyVersion()) {
            console.log(`Você já possui a última versão do teresa ${t.name}`);
            return;
        }
    }
    
    let asset = getMyOsVersion(t.assets);
    
    console.log(`Novo executável do teresa disponível!\nAutor: ${asset.uploader.login}\nVersão: ${t.tag_name}\nAtualize com o comando: $ teresinha update <path>`)
}

module.exports = () => {
    return check();
}