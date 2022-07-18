import CONFIG from '../../config.json';

const bookReservation = async ({ mentorTopicID, date }) => {
  const endpoint = '/reservations';
  const data = {
    mentor_topic_id: mentorTopicID,
    date,
  };

  await fetch(CONFIG.BASE_URL + endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    try {
      return await response.json();
    } catch (e) {
      return null;
    }
  });
  return null;
};

export default bookReservation;
