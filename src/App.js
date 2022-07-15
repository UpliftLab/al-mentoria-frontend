import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './features/header/Header';
import Mentors from './routes/Mentors';
import Reservations from './routes/Reservations';
import Topics from './routes/Topics';
import AddMentor from './routes/AddMentor';
import AddTopic from './routes/AddTopic';
import SigninPage from './routes/SigninPage';
import SignunPage from './routes/SignupPage';
import PersistData from './app/persistData';
import userSlice, { authenticateAsync } from './features/user/userSlice';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storage = new PersistData();
    if (storage.get('token')) {
      dispatch(authenticateAsync(storage.get('token')))
        .unwrap()
        .then(() => { })
        .catch(() => {
          toast.error('You need to login again!');
          dispatch(userSlice.actions.signOut());
        });
    }
  }, []);

  return (
    <div id="app" className="h-screen text-gray-700 flex relative">
      <BrowserRouter>
        <Header />
        <main className="h-screen w-full overflow-y-scroll flex relative">
          <Routes>
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/signup" element={<SignunPage />} />
            <Route path="/mentors" element={<Mentors />} />
            <Route path="/mentors/new" element={<AddMentor />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/topics" element={<Topics />} />
            <Route path="/topics/new" element={<AddTopic />} />
            <Route path="*" element={<Mentors />} />
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
