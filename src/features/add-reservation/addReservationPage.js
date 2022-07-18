import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import DropDownButton from '../button/DropDownButton';
import Button from '../button/Button';
import { bookReservationAsync, setMentor } from './addReservationSlice';
import DateSelectionInput from './DateSelectionInput';
import userSlice from '../user/userSlice';
import statusHandling from '../user/statusHandling';

const AddReservationPage = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const { mentor } = useSelector((state) => state.addReservation);
  const navigate = useNavigate();
  const { status, token } = useSelector((state) => state.user);

  useEffect(() => {
    const [stay, error] = statusHandling(status);
    if (!stay) {
      if (error) {
        toast.error(error);
      }
      dispatch(userSlice.actions.signOut());
      navigate('/signin');
    }
  }, [status]);

  if (state) {
    dispatch(setMentor(state.mentor));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(e.target.elements['reservation-date'].value) > new Date()) {
      await dispatch(bookReservationAsync({
        reservationDate: e.target.elements['reservation-date'].value,
        mentorTopicID: e.target.elements['mentor-topic-id'].value,
        token,
      })).unwrap().then((response) => {
        if (response) {
          toast.success('Reservation Created Successfully');
          navigate('/');
        } else {
          toast.error('Error Creating Reservation, Try again later.');
        }
      });
    } else {
      toast.error('You cannot reserve a date in past');
    }
  };

  return (
    <div id="add-mentor-page">
      <div className="bg-cover absolute inset-0" style={{ backgroundImage: 'url(https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1356&h=668&fit=crop)' }} />
      <div className="bg-lime-500 opacity-90 absolute inset-0" />
      <div className="flex flex-col justify-center items-center absolute inset-0 mx-10 gap-6">
        <p className="text-2xl tracking-widest font-bold text-white border-white border-b-[1px] pb-6 px-4 text-center">
          {mentor ? `BOOK A RESERVATION WITH ${mentor.name.toUpperCase()}` : 'SELECT A MENTOR FROM LIST'}
        </p>
        { mentor
          ? (
            <div className="flex flex-col justify-center items-center gap-6">
              <p className="text-white text-center max-w-3xl">
                {mentor.bio}
              </p>
              <form
                onSubmit={(e) => handleSubmit(e)}
                className="flex flex-wrap justify-center mt-4 gap-6"
              >
                <DropDownButton
                  options={mentor.mentor_topics.map((e) => ({
                    id: e.id,
                    text: e.topic.label,
                  }))}
                  defaultOption="Select a Topic"
                  elementID="mentor-topic-id"
                  required
                />
                <DateSelectionInput id="reservation-date" required />
                <Button isSubmit onClick={() => {}} child="Book Now" isWhite />
              </form>
            </div>
          ) : (
            <div />
          )}
      </div>
    </div>
  );
};

export default AddReservationPage;