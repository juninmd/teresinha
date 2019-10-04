import * as download from 'download';
import * as fs from 'fs';
import * as loading from 'loading-indicator';
import * as path from 'path';

export default async (options) => {
  const timer = loading.start('Baixando...');
  try {
    const data = await download(options.url);
    loading.stop(timer);
    fs.writeFileSync(`${options.directory}//${options.filename}`, data);
    return path.join(options.directory, options.filename);
  } catch (error) {
    loading.stop(timer);
    throw error;
  }
};
