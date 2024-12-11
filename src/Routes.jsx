import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react'; // Import lazy and Suspense for lazy loading
import Loading from './pages/Loading/Loading';
import Navbar from './components/Navbar';
import ProtectedRoute from './ProtectedRoutes';
import NotFound from './pages/NotFound/NotFound';

// Lazy load pages
const Branding = lazy(() => import('./pages/Branding/Branding'));
const Details = lazy(() => import('./pages/Details/Details'));
const BulkEnquiry = lazy(() => import('./pages/BulkEnquiry/BulkEnquiry'));
const AssignmentEnquiry = lazy(() => import('./pages/AssignmentEnquiry/AssignmentEnquiry'));
const Login = lazy(() => import('./pages/Login/Login'));
const OTPPage = lazy(() => import('./pages/Otp/Otp'));
const Address = lazy(() => import('./pages/Address/Address'));
const OrderDetails = lazy(() => import('./pages/OrderDetails/OrderDetails'));


const AppRoutes = () => (
  
  <Router>
     <Navbar />
      <Suspense fallback={<Loading />}> {/* Fallback UI while the component is loading */}
      <Routes>
        <Route path="/" element={<Navigate replace to="/branding" />} />
        <Route path="/branding" element={<Branding />} />
        <Route path="/branding/details/:id" element={<Details />} />
        <Route path='/assignments' element={<AssignmentEnquiry />} />
        <Route path='/bulk' element={<BulkEnquiry />} />
        <Route path='/login' element={<Login />} />
        <Route path='/otp' element={<OTPPage />} />

        {/* Protected Routes */}
        <Route path='/address' element={<ProtectedRoute element={<Address />} />} />
        <Route path='/order' element={<OrderDetails />} />

        {/* Page Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </Router>
);

export default AppRoutes;
