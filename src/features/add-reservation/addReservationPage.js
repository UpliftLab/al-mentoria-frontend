import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DropDownButton from '../button/DropDownButton';
import Button from '../button/Button';

const AddReservationPage = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const { mentor } = useSelector((state) => state.addReservation);

  return (
    <div id="add-mentor-page">
      <div className="bg-cover absolute inset-0" style={{ backgroundImage: 'url(https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1356&h=668&fit=crop)' }} />
      <div className="bg-lime-500 opacity-90 absolute inset-0" />
      <div className="flex flex-col justify-center items-center absolute inset-0 mx-10 gap-6">
        <p className="text-2xl tracking-widest font-bold text-white border-white border-b-[1px] pb-6 px-4 text-center">BOOK A RESERVATION WITH MENTOR NAME</p>
        <p className="text-white text-center max-w-3xl">
          It is a long established fact that a reader will be distracted by the readable
          content of a page when looking at its layout. The point of using Lorem Ipsum is that
          it has a more-or-less normal distribution of letters, as opposed to using making it
          look like readable English.
        </p>
        <div className="flex mt-4 gap-6">
          <DropDownButton options={['topics', 'here']} onChange={() => { }} />
          <Button onClick={() => {}} child="Book Now" isWhite />
        </div>
      </div>
    </div>
  );
};

export default AddReservationPage;
