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
import Monthly from "./pages/Monthly";
import Yearly from "./pages/Yearly";
import Completion from "./pages/Completion";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="tows" element={<Tows />} />
        <Route path="mechanics" element={<Mechanics />} />
        <Route path="emergencies" element={<Emergencies />} />
        <Route path="users" element={<Users />} />
        <Route path="reports" element={<Reports />} />
        <Route path="subscription" element={<Subscription />} />
        <Route path="yearly" element={<Yearly />} />
        <Route path="monthly" element={<Monthly />} />
        <Route path="subscription/completion" element={<Completion />} />

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
      </Route>
    </Routes>
  );
}

export default App;
