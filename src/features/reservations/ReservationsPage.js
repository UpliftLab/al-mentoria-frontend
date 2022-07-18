import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchReservationsAsync, deleteReservationAsync } from './reservationsSlice';
import { userStatus } from '../user/userSlice';

const ReservationsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { reservations, reservationStatus } = useSelector((state) => state.reservations);
  const { token, status } = useSelector((state) => state.user);
  useEffect(() => {
    if (
      status === userStatus.unauthenticated
      || status === userStatus.rejected
      || status === userStatus.failed
    ) {
      toast.error('You need to login first!');
      navigate('/signin');
    } else if (status === userStatus.authenticated) {
      dispatch(fetchReservationsAsync({ token }));
    }
  }, [status]);

  const deleteReservation = (id) => {
    dispatch(deleteReservationAsync({ token, id })).then(() => {
      toast.success('Reservation cancelled successfully!');
    }).catch(() => {
      toast.error('Error when cancelling reservation.');
    });
  };

  if (status === userStatus.authenticating || reservationStatus === 'loading') {
    return (
      <section className="relative flex flex-col w-full h-screen md:py-12">
        <h2 className="ml-10 text-2xl font-bold">Active reservations</h2>
        <div className="flex justify-center items-center p-10">
          <div className="spinner-border text-primary" role="status">
            <span className="h-6 w-6 block rounded-full border-4 border-t-lime-500 animate-spin" />
          </div>
        </div>
        <h2 className="ml-10 text-2xl font-bold">Old reservations</h2>
        <div className="flex justify-center items-center p-10">
          <div className="spinner-border text-primary" role="status">
            <span className="h-6 w-6 block rounded-full border-4 border-t-lime-500 animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative flex flex-col w-full h-screen md:py-12">
      <h2 className="ml-10 text-2xl font-bold">Active reservations</h2>
      {reservations?.data?.length !== 0 && (
        <ul className="grid 2xl:grid-cols-4 xl:grid-cols-3 justify-center md:grid-cols-2 gap-10 p-10">
          {reservations?.data?.map((reservation) => (
            <li key={reservation.id} className="bg-slate-100 pb-2 h-fit rounded justify-center overflow-hidden shadow-lg transform transition duration-500 hover:scale-105">
              <div className="flex justify-center">
                <img className="w-full h-64 object-cover" src={reservation.mentor.photo} alt="Sunset in the mountains" />
              </div>

              <div className="px-6 py-4">
                <h2 className="font-bold text-xl mb-2">{`${reservation.mentor.name} - ${reservation.topic.label}`}</h2>
                <h3 className="font-bold text-l mb-2">{reservation.date}</h3>
                <p className="text-gray-700 text-base">
                  {reservation.mentor.bio}
                </p>
              </div>
              <div className="px-6 pt-4 pb-2 flex justify-center">
                <button type="button" title="Cancel reservation" onClick={() => deleteReservation(reservation.id)}>
                  Cancel Reservation
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {reservations?.data?.length === 0 && (
        <div className="flex justify-center py-10">
          <p className="text-center">No reservations found</p>
        </div>
      )}
      <h2 className="ml-10 text-2xl font-bold">Old reservations</h2>
      <ul className="flex flex-col gap-5 py-10">
        {reservations?.old?.map((reservation) => (
          <li key={reservation.id} className="flex w-fit justify-center">
            <div className="flex items-center gap-5 w-full bg-slate-100 rounded-sm py-4 px-8 mx-10  shadow-lg transform transition duration-500 hover:scale-105">
              <div className="flex items-center gap-5 grow">
                <img className="w-12 h-12 rounded-full mr-4 object-cover" src={reservation.mentor.photo} alt="Avatar of Jonathan Reinink" />
                <h2>{reservation.mentor.name}</h2>
                <h3>{reservation.topic.label}</h3>
                <h3>{reservation.date}</h3>
              </div>
            </div>
          </li>
        ))}
        {status === userStatus.authenticated && reservationStatus === 'success' && reservations?.old?.length === 0 && (
          <li className="text-center text-gray-700 text-base">
            No old reservations found
          </li>
        )}
      </ul>

    </section>
  );
};

export default ReservationsPage;
