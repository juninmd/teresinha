import axios from 'axios';

export default async () => {
  try {
    const data = await axios.get('https://api.github.com/repos/luizalabs/teresa/releases/latest');
    return data.data;
  } catch (error) {
    throw error;
  }
};
