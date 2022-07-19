import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BsStar, BsStarFill } from 'react-icons/bs';
import Rating from 'react-rating';
import { toast } from 'react-toastify';
import { fetchTopics } from './MentorTopicsAPI';
import Loading from '../loading/loading';
import Button from '../button/Button';
import { addMentorTopicAsync, fetchMentorTopicsAsync } from './mentorTopicsSlice';

const MentorTopicForm = () => {
  const token = useSelector((state) => state.user.token);
  const [topics, setTopics] = useState([]);
  const [status, setStatus] = useState('INITIALIZED');
  const [rating, setRating] = useState(0);

  const { id: mentorId } = useParams();
  const dispatch = useDispatch();

  const theForm = useRef();
  const formDisabled = useRef(true);

  useEffect(() => {
    setStatus('FETCHING');
    fetchTopics(token)
      .then((response) => {
        setTopics(response.data);
        setStatus('FETCHED');
        formDisabled.current = false;
      })
      .catch((error) => {
        toast.error(error.message);
        setStatus('FAILED');
      });
  }, []);

  const addMentorTopic = (e) => {
    e.preventDefault();
    formDisabled.current = true;
    const parameters = {
      mentorId,
      topicId: e.target.topic.value,
      rating: e.target.rating.value,
      token,
    };
    dispatch(addMentorTopicAsync(parameters))
      .unwrap()
      .then(() => {
        toast.success('The topic added successfully');
        dispatch(fetchMentorTopicsAsync({ id: mentorId, token }));
        theForm.current.reset();
        formDisabled.current = false;
      })
      .catch(() => {
        toast.error('Failed to add topic!');
        formDisabled.current = false;
      });
    toast.info('Adding...');
  };

  if (status === 'FETCHED') {
    const options = topics.map((topic) => ({
      id: topic.id,
      text: topic.label,
    }));

    return (
      <div className="flex flex-col items-center gap-4 p-4 bg-white rounded border shadow">
        <h1 className="text-xl font-bold">Add topic</h1>
        <form action="" onSubmit={addMentorTopic} ref={theForm}>
          <fieldset className="flex flex-col items-center gap-4" disabled={formDisabled.current}>
            <select
              required
              defaultValue=""
              name="topic"
              className="px-6 py-2 rounded-full w-48 bg-white border-2 appearance-none"
            >
              <option value="" disabled>Choose a topic</option>
              {options.map((option) => (
                <>
                  <option key={option.id} value={option.id}>{option.text}</option>
                </>
              ))}
            </select>
            <input type="hidden" name="rating" value={rating} />
            <Rating
              step={1}
              initialRating={rating}
              stop={5}
              fractions={2}
              className="text-amber-300"
              emptySymbol={<BsStar className="w-6 h-6" />}
              fullSymbol={<BsStarFill className="w-6 h-6" />}
              onClick={(value) => setRating(value)}
            />
            <Button
              child={<>Add</>}
              isSubmit
            />
          </fieldset>
        </form>
      </div>
    );
  }

  if (status === 'FAILED') {
    return (
      <div className="text-white">Failed in fetching Topics! Try again later.</div>
    );
  }

  return (
    <Loading />
  );
};

export default MentorTopicForm;
