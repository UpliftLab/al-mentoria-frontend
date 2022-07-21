import CONFIG from '../../config.json';

export const fetchTopics = async (token) => {
  const endpoint = '/topics';
  const URL = CONFIG.BASE_URL + endpoint;

  const response = await fetch(URL, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response || response.status >= 400) {
    throw new Error('Failed to get data!');
  }

  try {
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Data parsing failed!');
  }
};

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

export const addMentorTopic = async (mentorId, topicId, rating, token) => {
  const endpoint = `/mentors/${mentorId}/topics`;
  const URL = CONFIG.BASE_URL + endpoint;

  const data = {
    mentor_id: mentorId,
    topic_id: topicId,
    rating,
  };

  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
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
