import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Topic from './Topic';
import { deleteTopicAsync, getTopicsAsync } from './topicSlice';
import userSlice, { userStatus } from '../user/userSlice';

const Topics = () => {
  const [open, setOpen] = useState({ open: false, id: null });
  const { topics } = useSelector((state) => state.topic);
  const { token, status, role } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      status === userStatus.unauthenticated
      || status === userStatus.failed
    ) {
      toast.error('You need to login!');
      navigate('/signin');
    } else if (status === userStatus.authenticated) {
      if (role === 'admin') {
        dispatch(getTopicsAsync(token))
          .unwrap()
          .catch((error) => {
            navigate('/');
            toast.error(error.message);
          });
      } else if (status === userStatus.rejected) {
        dispatch(userSlice.actions.signOut());
        navigate('/');
      } else if (status === userStatus.authenticating) {
        toast.info('Authenticating');
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
    <div className="flex flex-wrap justify-center gap-2">
      <div className={`fixed inset-0 h-full w-full bg-black/80 grid place-content-center backdrop-blur-sm ${(open.open ? 'z-10 block' : '-z-10 hidden')}`}>
        <div className="bg-white  rounded-md text-center shadow-lg p-4">
          <h1 className="text-xl mb-4 font-semibold">Do you really want to delete me?</h1>
          <button type="button" onClick={() => setOpen({ open: false, id: null })} className="bg-lime-600 px-4 py-2 rounded-md text-white">CANCEL</button>
          <button type="button" onClick={() => handleDeleteTopic(open.id)} className="bg-red-500 px-7 py-2 ml-2 rounded-md text-white font-semibold">DELETE</button>
        </div>
      </div>
      { (topics.length) ? topics.map((topic) => (
        <Topic
          key={topic.id}
          label={topic.label}
          icon={topic.icon}
          onClick={() => setOpen({ open: true, id: topic.id })}
        />
      )) : (
        <div className="text-center text-white">No topics found!</div>
      )}

    </div>
  );
};

export default Topics;
