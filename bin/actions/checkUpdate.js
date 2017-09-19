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
        let computerVersion = await teresa.verifyVersion()
        if (t.name == computerVersion) {
            console.log(`Você já possui a última versão do teresa: [${t.name}]`);
            return;
        }
        else{
            console.log(`A versão instalada é a [${computerVersion}], vamos atualizar para a [${t.name}]`);
        }
    }
    else{
        console.log(`Você ainda não tem o teresa instalado`);
    }
    
    let asset = getMyOsVersion(t.assets);
    
    console.log(`Informações da última release:\nAutor: ${asset.uploader.login}\nVersão: ${t.tag_name}\nAtualize com o comando: $ sudo teresinha update`)
}

module.exports = () => {
    return check();
}