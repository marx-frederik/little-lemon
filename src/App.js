import './App.css';
import Layout from './components/Layout/Layout';
import  HomePage  from './components/HomePage.jsx';
import BookingPage from './components/BookingPage.jsx';
import {Route, Routes, BrowserRouter } from 'react-router-dom';
import ConfirmedBooking from './components/ConfirmedBooking.jsx';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="*" element={<h1>Page Not Found</h1>} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/confirmation" element={<ConfirmedBooking />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
