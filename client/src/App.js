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
import ForgotPassword from "./pages/ForgotPassword";
import { ProtectedRoute } from "./components/ProtectedRoute";
// import Plans from "./pages/Plans";
import PrivacyPolicies from "./pages/PrivacyPolicies";
import RequireAuth from "./components/RequiredAuth";
import ReportDetailPage from "./components/reports/ReportDetailPage";
import UserDetailPage from "./components/users/UserDetailPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/privacypolicy" element={<PrivacyPolicies />} />
        {/* <Route path="unauthorized" element={<Unauthorized />} /> */}

        {/* protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
            <Route path="emergencies" element={<Emergencies />} />
            <Route path="tows" element={<Tows />} />
            <Route path="mechanics" element={<Mechanics />} />
            <Route path="users" element={<Users />} />
            <Route path="user-detail/:id" element={<UserDetailPage />} />
            <Route path="reports" element={<Reports />} />
            <Route path="report-detail/:id" element={<ReportDetailPage />} />

            {/* <Route path="/plans" element={<Plans />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/subscription/completion" element={<Completion />} /> */}
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
