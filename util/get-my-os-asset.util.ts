import * as os from 'os';

const targets = {
  Windows_NT: { token: 'windows', filename: 'teresa.exe' },
  Linux: { token: 'linux', filename: 'teresa' },
};

export default (assets) => {
  const { token, filename } = targets[os.type()] || { token: 'darwin', filename: 'teresa' };
  const asset = assets.find(q => q.name.indexOf(token) >= 0);
  if (!asset) {
    throw new Error(`Nenhum asset da release é compatível com ${os.type()}. Assets: ${assets.map(q => q.name).join(', ')}`);
  }
  return { ...asset, filename };
};
