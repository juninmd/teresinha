import * as fs from 'fs';
import * as path from 'path';

import download from 'download';
import loading from 'loading-indicator';

export default async (options) => {
  const timer = loading.start('Baixando...');
  try {
    const data = download(options.url);
    loading.stop(timer);
    fs.writeFileSync(`${options.directory}//${options.filename}`, data);
    return path.join(options.directory, options.filename);
  } catch (error) {
    loading.stop(timer);
    throw error;
  }
};
