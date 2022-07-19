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
  }).then(async (response) => {
    if (response.status === 201) {
      const data = await response.json();
      return data.data.id;
    }
    return null;
  });
  return result;
};

export default bookMentorAPI;
