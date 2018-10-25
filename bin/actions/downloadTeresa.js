const github = require('../api/github.js');
const teresa = require('../util/teresa');
const getMyOsVersion = require('../util/getMyOsAsset');
const downloadUtil = require('../util/download');

module.exports = async () => {
    const t = await github.getTeresa();
    if (t.documentation_url) {
        console.error('Token Inválido.');
        process.exit(1);
        return;
    }

    const asset = getMyOsVersion(t.assets);

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
        console.log(`Você ainda não tem o teresa instalado, vamos instalar a [${t.name}]`);
    }

    try {
        await downloadUtil({
            directory: __dirname,
            filename: asset.filename,
            url: asset.browser_download_url
        });
    } catch (error) {
        console.error('Falha ao efetuar o download.');
        throw error;
    }

    try {
        await teresa.setSudo();
        await teresa.setChmod(`${__dirname}//${asset.filename}`);
        await teresa.movePath(__dirname, asset.filename);
        console.log('Atualizado com sucesso meu parça!');

    } catch (error) {
        console.log(`Talvez você não tenha rodado o teresinha como super user, use '$ teresinha update'`)
        console.log(error.message)
    }
}