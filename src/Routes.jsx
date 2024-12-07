import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Branding from './pages/Branding/Branding';
import Navbar from './components/Navbar';
import Details from './pages/Details/Details';
import Student from './pages/Student/Student';
import Login from './pages/Login/Login';
import OTPPage from './pages/Otp/Otp';
import Address from './pages/Address/Address';

const AppRoutes = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Navigate replace to="/branding" />} />
      <Route path="/branding" element={<Branding />} />
      <Route path="/branding/details" element={<Details />} />
      <Route path='/assignments' element={<Student />} />
      <Route path='/bulk' element={<Student />} />
      <Route path='/login' element={<Login />} />
      <Route path='/otp' element={<OTPPage />} />

      <Route path='/address' element={<Address />} />
    </Routes>
  </Router>
);

export default AppRoutes;
