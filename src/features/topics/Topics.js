import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Topic from './Topic';
import { deleteTopicAsync, getTopicsAsync } from './topicSlice';
import { userStatus } from '../user/userSlice';

const Topics = () => {
  const [open, setOpen] = useState({ open: false, id: null });
  const { topics } = useSelector((state) => state.topic);
  const { token, status, role } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      status === userStatus.unauthenticated
      || status === userStatus.rejected
      || status === userStatus.failed
    ) {
      toast.error('You need to login!');
      navigate('/signin');
    } else if (status === userStatus.authenticated) {
      if (role === 'admin') {
        dispatch(getTopicsAsync(token))
          .unwrap()
          .then(() => {
            toast.success('successfully fetched topics');
          })
          .catch((error) => {
            navigate('/');
            toast.error(error.message);
          });
      } else if (status === userStatus.authenticating) {
        toast.info('authenticating');
      } else {
        navigate('/');
        toast.error('You are not authorized');
      }
    }
  }, [status]);

  const handleDeleteTopic = (id) => {
    setOpen(false);
    dispatch(deleteTopicAsync({ token, id }))
      .unwrap()
      .then(() => {
        toast.success('Successfully deleted the topic');
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="flex flex-wrap py-6 justify-start gap-2 w-fit">
      <div className={`absolute origin-center bottom-1 left-0 w-[calc(100%-8px)] mx-1 sm:bottom-12 sm:w-96 sm:left-[calc(50%-12rem)] bg-white px-16 py-14 rounded-md text-center shadow-lg ${(open.open ? 'z-10 block' : '-z-10 hidden')}`}>
        <h1 className="text-xl mb-4 font-bold text-slate-500">Do you Want DELETE?</h1>
        <button type="button" onClick={() => setOpen({ open: false, id: null })} className="bg-lime-600 px-4 py-2 rounded-md text-md text-white">CANCEL</button>
        <button type="button" onClick={() => handleDeleteTopic(open.id)} className="bg-red-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold">DELETE</button>
      </div>
      {
        topics.map((topic) => (
          <Topic
            key={topic.id}
            label={topic.label}
            icon={topic.icon}
            onClick={() => setOpen({ open: true, id: topic.id })}
          />
        ))
      }

    </div>
  );
};

export default Topics;
