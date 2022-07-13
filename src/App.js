import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './features/header/Header';
import Mentors from './routes/Mentors';
import Reservations from './routes/Reservations';
import Topics from './routes/Topics';
import AddMentor from './routes/AddMentor';
import AddTopic from './routes/AddTopic';

const App = () => (
  <div id="app" className="h-screen text-gray-700 flex">
    <BrowserRouter>
      <Header />
      <main className="h-screen w-full overflow-y-scroll flex">
        <Routes>
          <Route path="mentors" element={<Mentors />} />
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
        autoClose={5000}
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

export default App;
