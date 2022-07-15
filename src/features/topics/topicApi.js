import CONFIG from '../../config.json';

export default async function getTopicsFromApi() {
  const endpoint = '/topics';

  const response = await fetch(CONFIG.BASE_URL + endpoint);

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
