import CONFIG from '../../config.json';

const bookMentorAPI = async ({
  name, photo, bio, token,
}) => {
  const endpoint = '/mentors';
  const data = {
    name,
    photo,
    bio,
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

export default bookMentorAPI;
