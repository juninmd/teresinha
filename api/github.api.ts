import axios from 'axios';
import webconfig from '../config';

export default async () => {
  try {
    const data = await axios.get(`https://api.github.com/repos/luizalabs/teresa/releases/latest?access_token=${Buffer.from(webconfig.token, 'base64')}`);
    if (data.data.documentation_url) {
      console.error('Token Inválido.');
      throw 'Token Inválido GITHUB';
    }
    return data.data;
  } catch (error) {
    throw error;
  }
};
