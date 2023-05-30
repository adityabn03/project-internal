import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Demo from "./component/UserMenagement";
import Modal from "./component/Modal";
import DataDemo from "./component/DemoTable";

import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

function App() {
  const [admin, setAdmin] = useState("");

  const [dataRoleUserDetail, setDataRoleUserDetail] = useState([]);
  const [menu, setMenu] = useState([]);
  const handleDataFromChild = (data) => {
    setAdmin(data);
  };
  const handleRoleDetail = (data) => {
    setDataRoleUserDetail(data);
  };
  const handleMenu = (data) => {
    setMenu(data);
  };
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Login
              onDataFromChild={handleDataFromChild}
              dataMenu={handleMenu}
              dataMenuLevel={handleRoleDetail}
            />
          }
        />
        <Route
          path="/dashboard"
          element={<Dashboard levelmenu={dataRoleUserDetail} listmenu={menu} />}
        />
        <Route path="/Tabel" element={<DataDemo />} />
        <Route path="/Modal" element={<Modal />} />
      </Routes>
    </Router>
  );
}

export default App;
