// A mock function to mimic making an async request for data
import CONFIG from '../../config.json';

const fetchMentor = async (mentorID) => {
  const response = await fetch(
    `${CONFIG.BASE_URL}/mentors/${mentorID}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const data = await response.json();
  return data;
};

export default fetchMentor;
