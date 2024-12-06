import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Branding from './pages/Branding/Branding';
import Navbar from './components/Navbar';
import Details from './pages/Details/Details';

const AppRoutes = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Navigate replace to="/branding" />} />
      <Route path="/branding" element={<Branding />} />
      <Route path="/branding/details" element={<Details />} />
    </Routes>
  </Router>
);

export default AppRoutes;
