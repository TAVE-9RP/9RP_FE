import { Route, Routes } from 'react-router-dom';
import Main from '@/pages/main/MainPage';
import SignupStartPage from './pages/signup/SignupStartPage';
import CompanyRegisterPage from './pages/signup/CompanyRegisterPage';
import CompanyRegisterSecondPage from './pages/signup/CompanyRegisterSecondPage';
import EmployeeRegisterPage from './pages/signup/EmployeeRegisterPage';
import EmployeeRegisterSecondPage from './pages/signup/EmployeeRegisterSecondPage';
import EmployeeRegisterFourthPage from './pages/signup/EmployeeRegisterFourthPage';
import SignupSuccessPage from './pages/signup/SignupSuccesspage';
import SignupFailurePage from './pages/signup/SignupFailurePage';
import TestPage from './pages/test/test';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="signup" element={<SignupStartPage />} />
        <Route path="companysignup" element={<CompanyRegisterPage />} />
        <Route path="companysignup/step2" element={<CompanyRegisterSecondPage />} />
        <Route path="employeesignup" element={<EmployeeRegisterPage />} />
        <Route path="employeesignup/step2" element={<EmployeeRegisterSecondPage />} />
        <Route path="employeesignup/step4" element={<EmployeeRegisterFourthPage />} />
        <Route path="signupsuccess" element={<SignupSuccessPage />} />
        <Route path="signupfailure" element={<SignupFailurePage />} />

        <Route path="test" element={<TestPage />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
