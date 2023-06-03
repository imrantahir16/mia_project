import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Layout from "./components/Layout";

if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/*" element={<App />} />
          </Route>
        </Routes>
      </Provider>
    </Router>
  </React.StrictMode>
);
