// A mock function to mimic making an async request for data
import CONFIG from '../../config.json';

const fetchMentorDetails = async (mentorID) => {
  const response = await fetch(
    `${CONFIG.BASE_URL}/mentors/${mentorID}/topics`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${CONFIG.API_KEY}`,
      },
    },
  );
  const data = await response.json();
  return data;
};

export default fetchMentorDetails;