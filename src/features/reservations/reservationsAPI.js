import CONFIG from '../../config.json';

export const fetchReservations = async (token) => {
  const response = await fetch(
    `${CONFIG.BASE_URL}/reservations`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const data = await response.json();
  return data;
};

export const deleteReservation = async (token, reservationID) => {
  const response = await fetch(
    `${CONFIG.BASE_URL}/reservations/${reservationID}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (response.status === 204) {
    return {
      status: 'success',
      id: reservationID,
    };
  }
  return {
    status: 'error',
  };
};
