import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DropDownButton from '../button/DropDownButton';
import Button from '../button/Button';
import { setMentor } from './addReservationSlice';
import DateSelectionInput from './DateSelectionInput';

const AddReservationPage = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const { mentor } = useSelector((state) => state.addReservation);

  if (state) {
    dispatch(setMentor(state.mentor));
  }

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
              <div className="flex flex-wrap justify-center mt-4 gap-6">
                <DropDownButton
                  options={mentor.mentor_topics.map((e) => ({
                    id: e.id,
                    text: e.topic.label,
                  }))}
                  defaultOption="Select a Topic"
                  elementID="reservation-topic-id"
                />
                <DateSelectionInput id="reservation-date" />
                <Button isSubmit onClick={() => {}} child="Book Now" isWhite />
              </div>
            </div>
          ) : (
            <div />
          )}
      </div>
    </div>
  );
};

export default AddReservationPage;
