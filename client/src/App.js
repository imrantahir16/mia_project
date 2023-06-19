import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Missing from "./components/Missing";
import Register from "./pages/Register";
import Tows from "./pages/Tows";
import Mechanics from "./pages/Mechanics";
import Emergencies from "./pages/Emergencies";
import Users from "./pages/Users";
import Reports from "./pages/Reports";
// import Subscription from "./pages/Subscription";
import ResetPassword from "./pages/ResetPassword";
import { ProtectedRoute } from "./components/ProtectedRoute";
// import Plans from "./pages/Plans";
import PrivacyPolicies from "./pages/PrivacyPolicies";
import RequireAuth from "./components/RequiredAuth";
import UserDetailPage from "./components/users/UserDetailPage";
import UserPage from "./components/users/UserPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReportDetailPage from "./components/reports/ReportDetailPage";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyAccount from "./pages/VerifyAccount";

function App() {
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-account" element={<VerifyAccount />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/privacypolicy" element={<PrivacyPolicies />} />

        {/* protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="user" element={<UserPage />} />
          <Route element={<RequireAuth />}>
            <Route path="emergencies" element={<Emergencies />} />
            <Route path="tows" element={<Tows />} />
            <Route path="mechanics" element={<Mechanics />} />
            <Route path="users" element={<Users />} />
            <Route path="user-detail/:id" element={<UserDetailPage />} />
            <Route path="reports" element={<Reports />} />
            <Route path="report-detail/:id" element={<ReportDetailPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Missing />} />
        {/* </Route> */}
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
