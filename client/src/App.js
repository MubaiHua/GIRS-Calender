import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/loginPage";
import SignUp from "./pages/signupPage";
import CalenderPage from "./pages/calenderPage";
import TaskPage from "./pages/taskPage";
import PageNotFound from "./pages/404page"
const App =() => {
  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route path="/" exact element={<Login />} />
              <Route path="/log-in" exact element={<Login />} />
              <Route path="/sign-up" exact element={<SignUp />} />
              <Route path="/calender" exact element={<CalenderPage />} />
              <Route path="/task" exact element={<TaskPage />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}
export default App;
