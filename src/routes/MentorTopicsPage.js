import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../features/loading/loading';
import MentorTopics from '../features/mentorTopics/MentorTopics';
import { userStatus as USER_STATE } from '../features/user/userSlice';
import MentorTopicsSlice from '../features/mentorTopics/mentorTopicsSlice';

const MentorTopicsPage = () => {
  const { status: userStatus, role: userRole } = useSelector((state) => state.user);
  const [status, setStatus] = useState('INITIALIZED');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userStatus === USER_STATE.unauthenticated
      || userStatus === USER_STATE.rejected
      || userStatus === USER_STATE.failed
    ) {
      toast.error('You need to login first!');
      navigate('/signin');
    } else if (userStatus === USER_STATE.authenticated) {
      if (userRole === 'admin') {
        setStatus('AUTHORIZED');
      } else {
        navigate('..');
        toast.error('You are not authorized to visit this page!');
      }
    }
  }, [userStatus]);

  useEffect(() => () => {
    dispatch(MentorTopicsSlice.actions.cleanup());
  }, []);

  if (status === 'AUTHORIZED') {
    return (
      <div className="min-h-full flex flex-col items-center gap-8 bg-lime-600 p-4 pt-32">
        <MentorTopics />
      </div>
    );
  }

  return (
    <Loading />
  );
};

export default MentorTopicsPage;
