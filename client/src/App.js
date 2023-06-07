import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Missing from "./components/Missing";
import Register from "./pages/Register";
import Tows from "./pages/Tows";
import Mechanics from "./pages/Mechanics";
import Emergencies from "./pages/Emergencies";
import Users from "./pages/Users";
import Reports from "./pages/Reports";
import Subscription from "./pages/Subscription";
import Completion from "./pages/Completion";
import ForgotPassword from "./pages/ForgotPassword";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Plans from "./pages/Plans";
import PrivacyPolicies from "./pages/PrivacyPolicies";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/privacypolicy" element={<PrivacyPolicies />} />
      <Route path="/subscription" element={<Subscription />} />
      <Route path="/subscription/completion" element={<Completion />} />
      {/* protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="emergencies" element={<Emergencies />} />
        <Route path="tows" element={<Tows />} />
        <Route path="mechanics" element={<Mechanics />} />
        <Route path="users" element={<Users />} />
        <Route path="reports" element={<Reports />} />
        <Route path="/plans" element={<Plans />} />
      </Route>

      {/* Protected routes */}
      {/* <Route element={<PersistLogin />}>
          <Route element={<RequiredAuth allowedRoles={[ROLES.User]} />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<RequiredAuth allowedRoles={[ROLES.Editor]} />}>
            <Route path="editor" element={<Editor />} />
          </Route>
          <Route element={<RequiredAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>
          <Route
            element={
              <RequiredAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />
            }
          >
            <Route path="lounge" element={<Lounge />} />
          </Route>
        </Route> */}
      {/* catch any other routes */}
      <Route path="*" element={<Missing />} />
      {/* </Route> */}
    </Routes>
  );
}

export default App;
