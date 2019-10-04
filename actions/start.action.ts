import command from '../util/command.util';
import teresa from '../util/teresa.util';

export default async () => {

  const promises = (await teresa.allApps()).map((app) => {
    return command(`teresa app start ${app}`);
  });

  return Promise.all(promises);
};
