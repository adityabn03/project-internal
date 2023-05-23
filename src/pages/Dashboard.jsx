import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/sb-admin-2.css";
// import "../vendor/fontawesome-free/css/all.min.css";
import Sky from "../assets/images/Sky.png";
import Skysite from "../assets/images/LogoSky.png";
import "../assets/css/Dashboard.css";
import Demo from "../component/UserMenagement";
import { IconName } from "react-icons/ri";
import "../assets/css/modal.css";

const Dashboard = ({ listmenu, levelmenu }) => {
  const [menuList, setMenuList] = useState(listmenu);
  const [menuLevel, setMenuLevel] = useState(levelmenu);
  const [menuList1, setMenuList1] = useState(listmenu);
  const [menuLevel1, setMenuLevel1] = useState(levelmenu);
  const [sideBarHide, setSideBarHide] = useState(true);

  useEffect(() => {
    if (menuList === undefined) {
      setMenuList(listMenu);
    }
    if (menuLevel === undefined) {
      setMenuLevel(levelMenu);
    }
    if (menuList1 === undefined) {
      setMenuList1(listMenu);
    }
    if (menuLevel1 === undefined) {
      setMenuLevel1(levelMenu);
    }
  }, [menuList, menuLevel, menuList1, menuLevel1]);

  // Dapatkan data sesi
  const sessionData = JSON.parse(localStorage.getItem("sessionData"));
  const listMenu = JSON.parse(localStorage.getItem("ListMenu"));
  const levelMenu = JSON.parse(localStorage.getItem("LevelMenu"));
  console.log(menuList);
  console.log(menuLevel);
  console.log(menuList1);
  console.log(menuLevel1);
  console.log(listMenu);
  console.log(levelMenu);

  const lvusr = menuLevel;
  const objParent = menuList;
  let html = "";
  html +=
    '<ul className="nav side-menu" style="padding-left:16px;color: white">';
  // console.log(lvusr.length);
  for (let i = 0; i < objParent.data.data.length; i++) {
    for (let d = 0; d < lvusr.length; d++) {
      if (lvusr[d].ldlmdescription === objParent.data.data[i].mn_acl) {
        if (objParent.data.data[i].child.length > 0) {
          //bagian admin dan parameter
          html =
            html +
            `<li class="nav-item dropdown"><a class='dropdown-new'><i class="` +
            objParent.data.data[i].mn_icon +
            '"></i> ' +
            objParent.data.data[i].mn_name;
          html = html + ` <span class="fas fa-chevron-down"></span></a>`;
          html = html + `<ul class="nav-child" >`;

          for (var z = 0; z < objParent.data.data[i].child.length; z++) {
            for (var o = 0; o < lvusr.length; o++) {
              if (
                lvusr[o].ldlmdescription ===
                objParent.data.data[i].child[z].mn_acl
              ) {
                if (objParent.data.data[i].child[z].child.length > 0) {
                  html +=
                    `<li class='dropdown-item2' style = 'color:white'><a class='system-list' >` +
                    objParent.data.data[i].child[z].mn_name;
                  html += '<span class="fa fa-chevron-down"></span></a>';
                  html += '<ul class="nav child_menu2">';
                  for (
                    var u = 0;
                    u < objParent.data.data[i].child[z].child.length;
                    u++
                  ) {
                    for (var h = 0; h < lvusr.length; h++) {
                      if (
                        lvusr[h].ldlmdescription ===
                        objParent.data.data[i].child[z].child[u].mn_acl
                      ) {
                        html +=
                          '<li class="sub_menu"><a href="${local_server}' +
                          objParent.data.data[i].child[z].child[u].mn_link +
                          '">' +
                          objParent.data.data[i].child[z].child[u].mn_name +
                          "</a></li>";
                      }
                    }
                  }
                  html += "</ul>";
                  html += "</li>";
                } else {
                  html +=
                    '<li className="dropdown-item"><a href="${local_server}' +
                    objParent.data.data[i].child[z].mn_link +
                    '">' +
                    objParent.data.data[i].child[z].mn_name;
                  html += "</li>";
                }
              }
            }
          }
          html += "</ul>";
          html += "</li>";
        } else {
          html +=
            '<li class="nav-item"><a class="dropdown-new" href="${local_server}' +
            objParent.data.data[i].mn_link +
            `"><i class="` +
            objParent.data.data[i].mn_icon +
            `"></i>` +
            objParent.data.data[i].mn_name;
          html += "</li>";
        }
      }
    }
  }
  html += "</ul>";

  const lvusr1 = menuLevel1;
  const objParent1 = menuList1;
  let html1 = "";
  html1 +=
    '<ul className="nav side-menu" style="padding-left:16px;color: white">';
  // console.log(lvusr1.length);
  for (let a = 0; a < objParent1.data.data.length; a++) {
    for (let b = 0; b < lvusr1.length; b++) {
      if (lvusr1[b].ldlmdescription === objParent1.data.data[a].mn_acl) {
        if (objParent1.data.data[a].child.length > 0) {
          //bagian admin dan parameter
          html1 =
            html1 +
            `<li class="nav-item dropdown1"><a class='dropdown-new'><i class="` +
            "<RiAdminFill/>" +
            '"></i> ';
          // +
          // objParent1.data.data[a].mn_name;
          html1 = html1 + ` <span class="item"></span></a>`;
          html1 = html1 + `<ul class="nav-child1" >`;
          for (var y = 0; y < objParent1.data.data[a].child.length; y++) {
            for (var p = 0; p < lvusr1.length; p++) {
              if (
                lvusr1[p].ldlmdescription ===
                objParent1.data.data[a].child[y].mn_acl
              ) {
                if (objParent1.data.data[a].child[y].child.length > 0) {
                  html1 +=
                    `<li class='dropdown-item1' style = 'color:white'><a class='system-list' >` +
                    objParent1.data.data[a].child[y].mn_name;
                  html1 += '<span class="fa fa-chevron-down"></span></a>';
                  html1 += '<ul class="nav child_menu1">';
                  for (
                    var n = 0;
                    n < objParent1.data.data[a].child[y].child.length;
                    n++
                  ) {
                    for (var c = 0; c < lvusr1.length; c++) {
                      if (
                        lvusr1[c].ldlmdescription ===
                        objParent1.data.data[a].child[y].child[n].mn_acl
                      ) {
                        html1 +=
                          '<li class="sub_menu-site"><a href="${local_server}' +
                          objParent1.data.data[a].child[y].child[n].mn_link +
                          '">' +
                          objParent1.data.data[a].child[y].child[n].mn_name +
                          "</a></li>";
                      }
                    }
                  }
                  html1 += "</ul>";
                  html1 += "</li>";
                } else {
                  html1 +=
                    '<li className="dropdown-item"><a href="${local_server}' +
                    objParent1.data.data[a].child[y].mn_link +
                    '">' +
                    objParent1.data.data[a].child[y].mn_name;
                  html1 += "</li>";
                }
              }
            }
          }
          html1 += "</ul>";
          html1 += "</li>";
        } else {
          html1 +=
            '<li class="nav-item"><a class="dropdown-new" href="${local_server}' +
            objParent1.data.data[a].mn_link +
            `"><i class="` +
            objParent1.data.data[a].mn_icon +
            `"></i>`;
          //  +
          // objParent1.data.data[a].mn_name;
          html1 += "</li>";
        }
      }
    }
  }
  html1 += "</ul>";

  return (
    <div id="page-top">
      <div id="wrapper">
        {sideBarHide === true ? (
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
              <li
                className="nav-item"
                dangerouslySetInnerHTML={{ __html: html }}></li>
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
              <li
                className="nav-item"
                dangerouslySetInnerHTML={{ __html: html1 }}></li>
            </ul>
          </div>
        )}

        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-2 static-top shadow">
              {sideBarHide === true ? (
                <>
                  <button
                    className="btn mr-3"
                    onClick={() => setSideBarHide(false)}>
                    <i className="fa fa-bars"></i>
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn mr-3 "
                    onClick={() => setSideBarHide(true)}>
                    <i className="fa fa-bars"></i>
                  </button>
                </>
              )}

              <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown no-arrow">
                  <a href="/" className="log-out">
                    <i className="fa fa-user-circle"></i> Log Out
                  </a>
                </li>
              </ul>
            </nav>

            <Demo />
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
