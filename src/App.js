import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Logo from './components/Logo';
import OTPForm from './pages/otpForm/OTPForm';
import CourseList from './pages/courseList/CourseList';
import Batches from './pages/batches/Batches';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <div className="flex-1">
          <Routes>
            <Route path="/otp-form" element={<OTPForm />} />
            <Route path="/course-list" element={<CourseList />} />
            <Route path="/batches" element={<Batches />} />
            <Route path="/" element={<Navigate to="/otp-form" />} />
          </Routes>
        </div>
        <Logo />
      </div>
    </Router>
  );
}

export default App;
