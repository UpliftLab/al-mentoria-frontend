import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { IoIosArrowDropright } from 'react-icons/io';
import { BsStarFill, BsStar } from 'react-icons/bs';
import { FaPlusCircle } from 'react-icons/fa';
import Rating from 'react-rating';
import { toast } from 'react-toastify';
import {
  fetchMentorAsync, mentorDetailsSlice,
} from './mentorDetailsSlice';
import Button from '../button/Button';
import DirectionalButton from '../button/DirectionalButton';

const MentorDetailsPage = () => {
  const userRole = useSelector((state) => state.user.role);
  const { mentor } = useSelector((state) => state.mentorDetails);
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchMentorAsync(id))
      .unwrap()
      .then((data) => {
        if (data === undefined) {
          toast.error('Mentor not found');
          navigate('/mentors');
        }
      });
    return () => {
      dispatch(mentorDetailsSlice.actions.cleanUp());
    };
  }, []);

  const goBack = () => {
    navigate('/mentors');
  };

  const addReservation = () => {
    navigate('/reservations/new', { state: { mentor } });
  };

  return (
    <div className="relative flex flex-col w-full h-screen md:py-12">
      {mentor && (
        <div className="flex flex-col md:flex-row grow h-full md:pt-20 md:pb-10 ">
          <div className="grow md:w-2/5 flex items-center justify-center px-10">
            <img
              src={mentor.photo}
              className="h-4/5 object-cover block rounded-lg shadow-2xl"
              alt="Mentor"
            />
          </div>
          <div className="flex flex-col w-full md:w-72 md:mr-20 py-10 px-10 md:px-0">
            <h1 className="text-center md:text-right font-bold text-2xl">
              {mentor.name}
            </h1>
            <p className="mb-10 text-center md:text-right">{mentor.bio}</p>
            <div className="flex flex-col grow">
              <div className="grow flex flex-col rounded-2xl overflow-hidden border">
                <div className="flex justify-center items-center gap-4 border-b">
                  <h3 className="font-bold my-4">
                    Available topics
                  </h3>
                  {userRole === 'admin' && (
                    <Link to="topics" className="p-2 text-lime-500"><FaPlusCircle /></Link>
                  )}
                </div>
                {mentor.mentor_topics.length > 0 && (
                  <ul className="grow-0">
                    {mentor.mentor_topics.map((mentorDetail) => (
                      <li
                        key={mentorDetail.id}
                        className="odd:bg-gray-200 bg-gray-100 py-2 px-4"
                      >
                        <div className="flex items-center justify-center">
                          <div className="w-12 mr-2">
                            <img src={mentorDetail.topic.icon} alt="Topic" />
                          </div>
                          <h3 className="grow">{mentorDetail.topic.label}</h3>
                          <div>
                            <Rating
                              step={1}
                              initialRating={mentorDetail.rating}
                              readonly
                              stop={5}
                              fractions={2}
                              emptySymbol={<BsStar color="#F4C362" />}
                              fullSymbol={<BsStarFill color="#F4C362" />}
                            />
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                {(mentor.mentor_topics.length === 0) && (
                  <div className="text-center text-sm p-4">
                    <p>No topics found!</p>
                  </div>
                )}
              </div>

              {mentor.mentor_topics.length > 0 && (
                <div className="my-10 flex justify-center">
                  <Button
                    child={
                      (
                        <div className="flex items-center gap-3 justify-center">
                          <p>Book now</p>
                          <IoIosArrowDropright size={20} />
                        </div>
                      )
                    }
                    onClick={addReservation}
                  />
                </div>
              </div>
            )}
            {
              mentor.mentor_topics.length === 0
              && (
                <div className="flex w-full justify-center">
                  <p>No topics found for this mentor</p>
                </div>
              )

            }
          </div>
        </div>
      )}
      <DirectionalButton
        left
        twClasses="hidden md:block fixed md:absolute left-0 bottom-10"
        onClick={goBack}
      />
    </div>
  );
};

export default MentorDetailsPage;
