import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Button from '../button/Button';
import { addMentorAsync } from './addMentorSlice';
import statusHandling from '../user/statusHandling';
import userSlice, { userStatus } from '../user/userSlice';
import { status } from '../add-reservation/addReservationSlice';
import Loading from '../loading/loading';

const AddMentorPage = () => {
  const dispatch = useDispatch();
  const { status: userStatus, token, role } = useSelector((state) => state.user);
  const { status: addMentorStatus } = useSelector((state) => state.addMentor);
  const navigate = useNavigate();

  useEffect(() => {
    const [stay, error] = statusHandling(userStatus);
    if (!stay) {
      if (error) {
        toast.error(error);
      }
      dispatch(userSlice.actions.signOut());
      navigate('/signin');
      return;
    }
    if (userStatus === userStatus.authenticated && role !== 'admin') {
      toast.error('You must be admin to add a mentor');
      navigate('/');
    }
  }, [userStatus]);

  const isValidHttpUrl = (string) => {
    let url;

    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }

    return url.protocol === 'http:' || url.protocol === 'https:';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidHttpUrl(e.target.elements.photo.value)) {
      toast.error('Photo should be a valid url.');
      return;
    }

    await dispatch(addMentorAsync({
      name: e.target.elements.name.value,
      photo: e.target.elements.photo.value,
      bio: e.target.elements.bio.value,
      token,
    })).unwrap().then((mentorID) => {
      if (mentorID !== null) {
        toast.success('Mentor Created Successfully');
        navigate(`/mentors/${mentorID}`);
      } else {
        toast.error('Error Creating Mentor, Try again later.');
      }
    });
  };

  const inputClasses = 'shadow appearance-none border w-full rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline';
  const labelClasses = 'w-full md:w-auto';
  const spanClasses = 'block text-gray-700 text-sm font-bold mb-2';

  return (
    <div id="add-mentor-page" className="relative min-h-full w-full flex justify-center items-center bg-lime-600 py-16 px-8">
      <form
        className="flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 gap-6"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-wrap gap-6">
          <label htmlFor="name" className={labelClasses}>
            <span className={spanClasses}>
              Name
            </span>
            <input
              className={inputClasses}
              id="name"
              type="text"
              placeholder="Name"
              required
            />
          </label>

          <label htmlFor="photo-url" className={labelClasses}>
            <span className={spanClasses}>
              Photo URL
            </span>
            <input
              className={inputClasses}
              id="photo"
              type="text"
              placeholder="Photo URL"
              required
            />
          </label>
        </div>

        <label htmlFor="bio" className={labelClasses}>
          <span className={spanClasses}>
            Bio
          </span>
          <textarea
            className={inputClasses}
            id="bio"
            rows="10"
            placeholder="Enter bio here ..."
            maxLength={250}
            required
          />
        </label>

        <div className="flex items-center justify-between">
          <Button child={addMentorStatus === status.loading ? <Loading /> : 'Add Mentor'} isSubmit />
        </div>
      </form>
    </div>
  );
};

export default AddMentorPage;
