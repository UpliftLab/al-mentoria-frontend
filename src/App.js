import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './features/components/Header';

const App = () => (
  <div id="app" className="h-screen text-gray-700 flex">
    <BrowserRouter>
      <Header />
      <main className="h-screen w-full overflow-y-scroll flex">
        <Routes>
          <Route path="/" element={<div>HomePage</div>} />
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
