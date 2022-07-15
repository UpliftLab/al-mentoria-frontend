import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchReservationsAsync } from './reservationsSlice';

const ReservationsPage = () => {
  const dispatch = useDispatch();
  const { reservations } = useSelector((state) => state.reservations);

  useEffect(() => {
    dispatch(fetchReservationsAsync()).then((data) => {
      if (data.payload?.reservations?.data.length === 0) {
        toast.error('No reservations found');
      }
    });
  }, []);

  return (
    <div>
      <h1>Reservations</h1>
      <ul>
        {reservations.data.map((reservation) => (
          <li key={reservation.id}>
            {reservation.mentor.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservationsPage;
