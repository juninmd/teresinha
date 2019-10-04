import downloadUtil from '../util/download.util';
import getMyOsVersion from '../util/get-my-os-asset.util';
import github from '../api/github.api';
import teresa from '../util/teresa.util';

export default async () => {
  const t = await github();
  if (t.documentation_url) {
    console.error('Token Inválido.');
    process.exit(1);
    return;
  }

  const asset = getMyOsVersion(t.assets);

  const teresaExist = await teresa.verifyInstalled();
  if (teresaExist) {
    const computerVersion = await teresa.verifyVersion();
    if (t.name === computerVersion) {
      console.log(`Você já possui a última versão do teresa: [${t.name}]`);
      return;
    }

    console.log(`A versão instalada é a [${computerVersion}], vamos atualizar para a [${t.name}]`);

  } else {
    console.log(`Você ainda não tem o teresa instalado, vamos instalar a [${t.name}]`);
  }

  try {
    await downloadUtil({
      directory: __dirname,
      filename: asset.filename,
      url: asset.browser_download_url,
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
    console.log("Talvez você não tenha rodado o teresinha como super user, use '$ teresinha update'");
    console.log(error.message);
  }
};
