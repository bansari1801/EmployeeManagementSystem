import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './login';
import ForgotPassword from './forgotPassword';
import ResetPassword from './resetPassword';
import Register from './register';
import Home from './home';
import EditProfile from './editProfile';
import EmployeeHomeScreen from './employeeHomeScreen';
import ProtectedRoute from './protectedRoute';

export default function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/forgotPassword" element={<ForgotPassword />} />
          <Route exact path="/resetPassword" element={<ResetPassword />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <EmployeeHomeScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editProfile"
            element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
