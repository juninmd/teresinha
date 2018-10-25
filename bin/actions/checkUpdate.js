const github = require('../api/github.js');
const getMyOsVersion = require('../util/getMyOsAsset')
const teresa = require('../util/teresa')

module.exports = async () => {
    const t = await github.getTeresa();
    if (t.documentation_url) {
        console.error('Token Inválido.');
        throw 'Token Inválido GITHUB';
    }

    const teresaExist = await teresa.verifyInstalled();
    if (teresaExist) {
        const computerVersion = await teresa.verifyVersion()
        if (t.name === computerVersion) {
            console.log(`Você já possui a última versão do teresa: [${t.name}]`);
            return;
        }
        else {
            console.log(`A versão instalada é a [${computerVersion}], vamos atualizar para a [${t.name}]`);
        }
    }
    else {
        console.log(`Você ainda não tem o teresa cli instalado`);
    }

    const asset = getMyOsVersion(t.assets);
    console.log(`Informações da última release:\nAutor: ${asset.uploader.login}\nVersão: ${t.tag_name}\nAtualize com o comando: $ teresinha update`)
}