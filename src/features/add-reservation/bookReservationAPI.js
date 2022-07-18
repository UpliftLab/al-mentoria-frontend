import CONFIG from '../../config.json';

const bookReservation = async ({ mentorTopicID, date, token }) => {
  const endpoint = '/reservations';
  const data = {
    mentor_topic_id: mentorTopicID,
    date,
  };

  const result = await fetch(CONFIG.BASE_URL + endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }).then((response) => response.status === 201);
  return result;
};

export default bookReservation;
