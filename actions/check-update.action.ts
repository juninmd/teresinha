import getMyOsVersion from '../util/get-my-os-asset.util';
import github from '../api/github.api';
import teresa from '../util/teresa.util';

export default async () => {
  const t = await github();

  const teresaExist = await teresa.verifyInstalled();
  if (teresaExist) {
    const computerVersion = await teresa.verifyVersion();
    if (t.name === computerVersion) {
      console.log(`Você já possui a última versão do teresa: [${t.name}]`);
      return;
    }

    console.log(`A versão instalada é a [${computerVersion}], vamos atualizar para a [${t.name}]`);

  } else {
    console.log('Você ainda não tem o teresa cli instalado');
  }

  const asset = getMyOsVersion(t.assets);
  console.log(`Informações da última release:\nAutor: ${asset.uploader.login}\nVersão: ${t.tag_name}\nAtualize com o comando: $ teresinha update`);
};
