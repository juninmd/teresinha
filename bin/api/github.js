const { get } = require('axios');
const webconfig = require('../../webconfig');

module.exports = async () => {
  try {
    const data = await get(`https://api.github.com/repos/luizalabs/teresa/releases/latest?access_token=${Buffer.from(webconfig.token, 'base64')}`);
    return data.data;
  } catch (error) {
    throw error;
  }
}