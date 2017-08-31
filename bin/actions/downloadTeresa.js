const github = require('../api/github.js')();
const teresa = require('../util/teresa')
const getMyOsVersion = require('../util/getMyOsAsset')
const downloadUtil = require('../util/download');

async function download(directory) {
    try {
        let t = await github.getTeresa();

        let asset = getMyOsVersion(t.assets);

        let downloadTeresa = await downloadUtil({
            directory: directory,
            filename: asset.filename,
            url: asset.browser_download_url
        });

        console.log('Atualizado com sucesso meu parça!');

        teresa().setChmod(directory + asset.filename)

    } catch (ex) {
        console.error(ex.message);
    }
}

module.exports = () => {
    return download();
}