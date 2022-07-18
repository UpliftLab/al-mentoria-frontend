import CONFIG from '../../config.json';

const fetchMentors = async () => {
  const endpoint = '/mentors';

  const response = await fetch(CONFIG.BASE_URL + endpoint);

  if (!response || response.status !== 200) {
    throw new Error('Can not sign in user with the provided Endpoint');
  }

  try {
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Can not get JSON from the response');
  }
};

export default fetchMentors;
