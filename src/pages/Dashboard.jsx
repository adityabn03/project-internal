import React, { useState, useEffect } from "react";
import "../assets/css/sb-admin-2.css";
import Sky from "../assets/images/Sky.png";
import Skysite from "../assets/images/LogoSky.png";
import "../assets/css/Dashboard.css";
import Demo from "../component/UserMenagement";
import Rule from "../component/RuleMenagement";
import Audit from "../component/auditTrail"
import { IconName } from "react-icons/ri";
import "../assets/css/modal.css";
import axios from "axios";
import { getToken } from "../API/api";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

const Dashboard = ({ listmenu, levelmenu, user }) => {
  const [menuList, setMenuList] = useState(listmenu);
  const [menuLevel, setMenuLevel] = useState(levelmenu);

  console.log(menuList);
  console.log(menuLevel);

  return (
    <div id="page-top">
      <div id="wrapper">
        <div className="test-sidebar">
          <a
            className="sidebar-brand d-flex align-items-center justify-content-center"
            href="index.html">
            <div className="sidebar-brand-icon rotate-n-15">
              {/* <i className="fas fa-laugh-wink"></i> */}
            </div>
            <div className="sidebar-brand-text mx-3 shadow">
              <img src={Sky} alt="" className="logoSky" />
            </div>

            {/* <button
                className="fa fa-bars"
                onClick={() => setSideBarHide(false)}></button> */}

          </a>
          <ul
            className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
            id="accordionSidebar">
            <li className="py-2 px-4 hover:bg-gray-700">
              <a class=" text-white-500 flex items-center justify-between py-1.5 px-4 rounded cursor-pointer">
                <span class="flex items-center space-x-2">
                  {/* {menuList !== [] || menuList !== null ? (
                    <span className="font-bold">{listmenu[0].mn_name}</span>
                  ) : (
                    <></>
                  )} */}
                </span>
              </a>
            </li>

            {/* <li className="py-2 px-4 hover:bg-gray-700">
              {" "}
              <a class=" text-white-500 flex items-center justify-between py-1.5 px-4 rounded cursor-pointer">
                <span class="flex items-center space-x-2">
                  <span className="font-bold">{listmenu[1].mn_name}</span>
                </span>
              </a>
            </li>
            <li className="py-2 px-4 hover:bg-gray-700">
              {" "}
              <a class=" text-white-500 flex items-center justify-between py-1.5 px-4 rounded cursor-pointer">
                <span class="flex items-center space-x-2">
                  <span className="font-bold">{listmenu[2].mn_name}</span>
                </span>
              </a>
            </li> */}
          </ul>
        </div>

            </a>
            <ul
              className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
              id="accordionSidebar">
              {/* <li
                className="nav-item"
                dangerouslySetInnerHTML={{ __html: html }}></li> */}
              <li className="py-2 px-4 hover:bg-gray-700">
                {" "}
                <a
                  class=" text-white-500 flex items-center justify-between py-1.5 px-4 rounded cursor-pointer"
                  onClick={() => setruleMenagement(false)}>
                  <span class="flex items-center space-x-2">
                    <span className="font-bold">User Menagement</span>
                  </span>
                </a>
              </li>

              <li className="py-2 px-4 hover:bg-gray-700">
                {" "}
                <a
                  class=" text-white-500 flex items-center justify-between py-1.5 px-4 rounded cursor-pointer"
                  onClick={() => setruleMenagement(true)}>
                  <span class="flex items-center space-x-2">
                    <span className="font-bold">Role Menagement</span>
                  </span>
                </a>
              </li>

              {/* <li className="py-2 px-4 hover:bg-gray-700">
                {" "}
                <a
                  class=" text-white-500 flex items-center justify-between py-1.5 px-4 rounded cursor-pointer"
                  onClick={() => setruleMenagement(false)}>
                  <span class="flex items-center space-x-2">
                    <span className="font-bold">Audit Trail</span>
                  </span>
                </a>
              </li> */}
            </ul>
          </div>
        ) : (
          <div className="test-sidebar-site">
            <a
              className="sidebar-brand d-flex align-items-center justify-content-center"
              href="index.html">
              <div className="sidebar-brand-icon rotate-n-15">
                {/* <i className="fas fa-laugh-wink"></i> */}
              </div>
              <div className="sidebar-brand-text mx-3 shadow">
                <img src={Skysite} alt="" className="logoSkySite" />
              </div>

              {/* <button
                className="fa fa-bars"
                onClick={() => setSideBarHide(true)}></button> */}
            </a>
            <ul
              className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
              id="accordionSidebar">
              {/* <li
                className="nav-item"
                dangerouslySetInnerHTML={{ __html: html1 }}></li> */}
            </ul>
          </div>
        )}


        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-2 static-top shadow">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown no-arrow flex">
                  <a href="/" className="log-out flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="w-6 h-6">
                      <path
                        fill-rule="evenodd"
                        d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span>Log Out</span>
                  </a>
                </li>
              </ul>
            </nav>

            <Demo />

            {/* <Demo /> */}

            {ruleMenagement ? (ruleMenagement === true ? <Rule /> : <Audit />) : <Demo />}

          </div>

          <footer className="sticky-footer bg-white">
            <div className="container my-auto">
              <div className="copyright text-center my-auto">
                <span>Copyright &copy; Your Website 2023</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
