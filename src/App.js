import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import Header from './features/header/Header';
import MentorsPage from './routes/MentorsPage';
import Reservations from './routes/Reservations';
import AddMentor from './routes/AddMentor';
import AddReservation from './routes/AddReservation';
import MentorDetails from './routes/MentorDetails';

import SigninPage from './routes/SigninPage';
import SignunPage from './routes/SignupPage';
import userSlice, { authenticateAsync } from './features/user/userSlice';
import TopicsPage from './routes/TopicsPage';
import MentorTopicsPage from './routes/MentorTopicsPage';

const App = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    if (token) {
      dispatch(authenticateAsync(token))
        .unwrap()
        .then(() => { })
        .catch(() => {
          toast.error('You need to login again!');
          dispatch(userSlice.actions.signOut());
        });
    } else {
      dispatch(userSlice.actions.setUnauthenticated());
    }
  }, []);

  return (
    <div id="app" className="h-screen text-gray-700 flex relative">
      <BrowserRouter>
        <Header />
        <main className="h-screen w-full overflow-y-auto relative">
          <Routes>
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/signup" element={<SignunPage />} />
            <Route path="/mentors" element={<Outlet />}>
              <Route index element={<MentorsPage />} />
              <Route path=":id" element={<Outlet />}>
                <Route index element={<MentorDetails />} />
                <Route path="topics" element={<MentorTopicsPage />} />
              </Route>
            </Route>
            <Route path="/mentors/new" element={<AddMentor />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/reservations/new" element={<AddReservation />} />
            <Route path="/topics" element={<TopicsPage />} />
            <Route path="*" element={<MentorsPage />} />
          </Routes>
        </main>
      </BrowserRouter>
      <aside>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </aside>
    </div>
  );
};

export default App;
