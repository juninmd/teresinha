import axios from 'axios';
import webconfig from '../config';

export default async () => {
  try {
    const data = await axios.get(`https://api.github.com/repos/luizalabs/teresa/releases/latest?access_token=${Buffer.from(webconfig.token, 'base64')}`);
    return data.data;
  } catch (error) {
    throw error;
  }
};
