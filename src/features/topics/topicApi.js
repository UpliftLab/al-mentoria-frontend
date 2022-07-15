import PersistData from '../../app/persistData';
import CONFIG from '../../config.json';

const storage = new PersistData();

export default async function getTopicsFromApi() {
  const endpoint = '/topics';

  const response = await fetch(CONFIG.BASE_URL + endpoint, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${storage.get('token')}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response || response.status !== 200) {
    throw new Error('You are not authorized to make this request');
  }

  try {
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Can not get JSON from the response');
  }
}
