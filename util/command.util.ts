import * as nodecmd from 'node-cmd';

export default (command): Promise<any> => {
  return new Promise((resolve, reject) => {
    nodecmd.get(command, (err, data) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      return resolve(data);
    });
  });
};
