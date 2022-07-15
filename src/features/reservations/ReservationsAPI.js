import CONFIG from '../../config.json';

const fetchReservations = async () => {
  const response = await fetch(
    `${CONFIG.BASE_URL}/reservations`,
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

export default fetchReservations;
