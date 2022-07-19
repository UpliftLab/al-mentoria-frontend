import CONFIG from '../../config.json';

const fetchMentorTopics = async (mentorId, token) => {
  const endpoint = `/mentors/${mentorId}/topics`;
  const URL = CONFIG.BASE_URL + endpoint;

  const response = await fetch(URL, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response || /^[45]/.test(response.status)) {
    throw new Error('Failed to get data!');
  }

  try {
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Can not get JSON from the response');
  }
};

export default fetchMentorTopics;
