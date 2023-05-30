import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import { getToken } from "../API/api";
import Modal from "./Modal";
import ModalEdit from "./ModalEdit";
import axios from "axios";
import Swal from "sweetalert2";
// import { BsFillPersonPlusFill } from "react-icons/bs";
// import { ImSearch } from "react-icons/im";

const UserMenagement = () => {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState();

  const [currentUser, setCurrentUser] = useState(users);

  // ! variables untuk kebutuhan hit delete user
  const [userID, setUserId] = useState("");

  // Dapatkan data sesi
  const sessionData = JSON.parse(localStorage.getItem("tokenData"));
  // console.log(sessionData);
  const token = sessionData;

  useEffect(() => {
    if (token !== "") {
      getUserList();
      console.log(1);
    }
  }, [token]);

  const getUserList = async () => {
    try {
      const listUser = await axios.get(
        "http://116.206.196.65:30983/skycore/User/list",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const cekData = listUser.data.data.map((e) => {
        return e;
      });
      console.log(cekData);
      setUsers(cekData);
    } catch (errorUser) {
      alert(errorUser);
    }
  };

  // ! nanti atur secara dinamis
  const dataLogUserTracking = {
    plcd: "ua",
    plusr: "crm_admin",
    plhtt: "OFF",
    plsvrn: "uat-web-los",
    plact: "Login Success",
    plpgur: "/lmsadmin_ocbc/login/v6/nc",
    plqry: "-",
    plbro: "Firefox 72.0",
    plos: "linux",
    plcli: "uat-web-los/10.1.1.1",
  };

  const postDataLogUserTracking = async () => {
    try {
      const frisLogin = await axios.post(
        "http://116.206.196.65:30983/skycore/LogActivity/postDataLogUserTracking",
        JSON.stringify(dataLogUserTracking),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("postDataLogUserTracking Berhasil");
    } catch (error) {
      alert(error);
    }
  };

  //! --------for API delete--------
  const hitDelete = {
    usr: userID,
    logid: "11",
  };
  const DeleteUser = async () => {
    try {
      const userDelete = await axios.post(
        "http://116.206.196.65:30983/skycore/User/postJDataDelRecord",
        JSON.stringify(hitDelete),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(userDelete);
      Swal.fire("User Berhasil Di Hapus", "", "success");
      console.log(userID);
    } catch (error) {
      alert(error);
    }
  };

  // ? Menghapus pengguna
  const handleDeleteUser = (id) => {
    if (window.confirm("Anda yakin ingin menghapus pengguna ini?")) {
      deleteUser(id);
      setUserId(id);
    }
  };

  useEffect(() => {
    if (userID !== "") {
      DeleteUser();
    }
  }, [userID]);

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.usruserid !== id));
  };
  //! ----batas Hit Api delete-----

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  // Mendapatkan index pengguna pada halaman saat ini
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Mengubah halaman
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Mengatur nilai pencarian
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  // Filter pengguna berdasarkan kata kunci pencarian
  const filteredUsers = currentUsers.filter((user) =>
    user.usrname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //! Edit User
  const [detaiUserParam, setDetaiUserParam] = useState("adm_sky");

  useEffect(() => {
    getUserDetail();
  }, [detaiUserParam]);

  const editUser = (userid) => {
    setDetaiUserParam(userid);
    setIsModalOpenEdit(true);
  };

  const [userEdit, setUserEdit] = useState();

  const getUserDetail = async () => {
    try {
      const listUserDetail = await axios.get(
        "http://116.206.196.65:30983/skycore/User/getDataUser/" +
          detaiUserParam,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const cekData = listUserDetail.data.data.map((e) => {
        return e;
      });
      console.log(listUserDetail);
      setUserEdit(cekData[0]);
    } catch (errorUser) {
      console.log(errorUser);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);

  const openModalEdit = () => {
    setIsModalOpenEdit(true);
  };

  const closeModalEdit = () => {
    setIsModalOpenEdit(false);
  };

  return (
    <div className="card shadow mb-4">
      <div className="card-header d-flex justify-content-between mb-2">
        <div className="test">
          <h4> User Menagement</h4>
        </div>
        <div className="btn-new">
          <button className="btn btn-primary" onClick={openModal}>
            Add new
          </button>
        </div>
      </div>

      <div className="card-body">
        <div className="datatable-wrapper datatable-loading no-footer sortable searchable fixed-columns">
          <div className="datatable-top mb-3 d-flex justify-content-between">
            <div className="page-iittem"></div>
            <div className="page-iittem">
              <input
                type="text"
                placeholder="Cari pengguna..."
                value={searchTerm}
                onChange={handleSearch}
                className="form-control"
              />
            </div>

            {/* <input type="number" /> */}
          </div>
          <div className="datatable-container px-2">
            <table
              className="table table-bordered dataTable"
              id="dataTable"
              cellSpacing="0">
              <thead>
                <tr>
                  <th>User Id</th>
                  <th>Name</th>
                  <th>Nip</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.usrid}>
                    <td>{user.usruserid}</td>
                    <td>{user.usrname}</td>
                    <td>{user.usrnip}</td>
                    <td>{user.usrsupervisor}</td>
                    <td>{user.usrstatusformat}</td>
                    <td>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => editUser(user.usruserid)}>
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm ml-1"
                        onClick={() => handleDeleteUser(user.usruserid)}>
                        Hapus
                      </button>
                      {user.usrstatusformat === "Active" ? (
                        <button className="btn btn-warning btn-sm ml-1">
                          Active
                        </button>
                      ) : (
                        <></>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination */}
            <nav>
              <div className="pagination-item d-flex justify-content-between">
                <div className="page-1"></div>
                <div className="page-2">
                  {" "}
                  <ul className="pagination">
                    {users.map((user, index) => (
                      <li className="page-item" key={index}>
                        <button
                          className={`page-link ${
                            currentPage === index + 1 ? "active" : ""
                          }`}
                          onClick={() => paginate(index + 1)}>
                          {index + 1}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} reload={getUserList}>
        <button onClick={closeModal}>Tutup Modal</button>
      </Modal>

      {/* <ModalEdit
        isOpen={isModalOpenEdit}
        onClose={closeModalEdit}
        currentUser={userEdit}
        demo={getUserDetail}
        reload={getUserList}
      /> */}
      {userEdit !== undefined ? (
        <ModalEdit
          isOpen={isModalOpenEdit}
          onClose={closeModalEdit}
          currentUser={userEdit}
          reload={getUserList}
        />
      ) : (
        <></>
      )}

      {/*  modal edit */}

      {/* {isModalOpenEdit ? (
        <ModalEdit
          isOpen={isModalOpenEdit}
          onClose={closeModalEdit}
          currentUser={userEdit}
        />
      ) : (
        <></>
      )} */}
    </div>
  );
};

export default UserMenagement;

// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { getToken } from "../API/api";
// import Modal from "./Modal";
// import ModalEdit from "./ModalEdit";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { BsFillPersonPlusFill } from "react-icons/bs";
// import { ImSearch } from "react-icons/im";

// const Demo = () => {
//   const [users, setUsers] = useState([]);
//   const [status, setStatus] = useState();

//   const [currentUser, setCurrentUser] = useState(users);

//   // ! variables untuk kebutuhan hit delete user
//   const [userID, setUserId] = useState("");

//   // const [users, setUsers] = useState([
//   //   { id: 1, name: "John Doe", age: 25 },
//   //   { id: 2, name: "Jane Smith", age: 30 },
//   //   { id: 3, name: "Bob Johnson", age: 35 },
//   //   { id: 4, name: "Grasia", age: 25 },
//   //   { id: 5, name: "Aida", age: 30 },
//   //   { id: 6, name: "Puspita", age: 35 },
//   //   { id: 7, name: "Anatahius", age: 25 },
//   //   { id: 8, name: "Lulu", age: 30 },
//   //   { id: 9, name: "Rinto", age: 35 },
//   //   { id: 10, name: "Oci", age: 25 },
//   // ]);

//   // Dapatkan data sesi
//   const sessionData = JSON.parse(localStorage.getItem("tokenData"));
//   // console.log(sessionData);
//   const token = sessionData;

//   useEffect(() => {
//     if (token !== "") {
//       getUserList();
//       console.log(1);
//     }
//   }, [token]);

//   const getUserList = async () => {
//     try {
//       const listUser = await axios.get(
//         "http://116.206.196.65:30983/skycore/User/list",
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const cekData = listUser.data.data.map((e) => {
//         return e;
//       });
//       console.log(cekData);
//       setUsers(cekData);
//     } catch (errorUser) {
//       alert(errorUser);
//     }
//   };

//   // ! nanti atur secara dinamis
//   const dataLogUserTracking = {
//     plcd: "ua",
//     plusr: "crm_admin",
//     plhtt: "OFF",
//     plsvrn: "uat-web-los",
//     plact: "Login Success",
//     plpgur: "/lmsadmin_ocbc/login/v6/nc",
//     plqry: "-",
//     plbro: "Firefox 72.0",
//     plos: "linux",
//     plcli: "uat-web-los/10.1.1.1",
//   };

//   const postDataLogUserTracking = async () => {
//     try {
//       const frisLogin = await axios.post(
//         "http://116.206.196.65:30983/skycore/LogActivity/postDataLogUserTracking",
//         JSON.stringify(dataLogUserTracking),
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       alert("postDataLogUserTracking Berhasil");
//     } catch (error) {
//       alert(error);
//     }
//   };

//   //! --------for API delete--------
//   const hitDelete = {
//     usr: userID,
//     logid: "11",
//   };
//   const DeleteUser = async () => {
//     try {
//       const userDelete = await axios.post(
//         "http://116.206.196.65:30983/skycore/User/postJDataDelRecord",
//         JSON.stringify(hitDelete),
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log(userDelete);
//       Swal.fire("User Berhasil Di Hapus", "", "success");
//       console.log(userID);
//     } catch (error) {
//       alert(error);
//     }
//   };

//   // ? Menghapus pengguna
//   const handleDeleteUser = (id) => {
//     if (window.confirm("Anda yakin ingin menghapus pengguna ini?")) {
//       deleteUser(id);
//       setUserId(id);
//     }
//   };

//   useEffect(() => {
//     if (userID !== "") {
//       DeleteUser();
//     }
//   }, [userID]);

//   const deleteUser = (id) => {
//     setUsers(users.filter((user) => user.usruserid !== id));
//   };
//   //! ----batas Hit Api delete-----

//   const [currentPage, setCurrentPage] = useState(1);
//   const [usersPerPage, setUsersPerPage] = useState(5);
//   const [searchTerm, setSearchTerm] = useState("");

//   // Mendapatkan index pengguna pada halaman saat ini
//   const indexOfLastUser = currentPage * usersPerPage;
//   const indexOfFirstUser = indexOfLastUser - usersPerPage;
//   const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

//   // Mengubah halaman
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   // Mengatur nilai pencarian
//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//     setCurrentPage(1);
//   };

//   // Filter pengguna berdasarkan kata kunci pencarian
//   const filteredUsers = currentUsers.filter((user) =>
//     user.usrname.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   //! Edit User

//   const [userEdit, setUserEdit] = useState();
//   const editUser = (userid) => {
//     setUserEdit(userid);
//     setIsModalOpenEdit(true);
//   };

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);

//   const openModalEdit = () => {
//     setIsModalOpenEdit(true);
//   };

//   const closeModalEdit = () => {
//     setIsModalOpenEdit(false);
//   };

//   return (
//     <div className="card shadow mb-4">
//       <div className="card-header d-flex justify-content-between mb-2">
//         <div className="test">
//           <h4> User Menagement</h4>
//         </div>
//         <div className="btn-new">
//           <button className="btn btn-primary" onClick={openModal}>
//             Add new
//           </button>
//         </div>
//       </div>

//       <div className="card-body">
//         <div className="datatable-wrapper datatable-loading no-footer sortable searchable fixed-columns">
//           <div className="datatable-top mb-3 d-flex justify-content-between">
//             <div className="page-iittem"></div>
//             <div className="page-iittem">
//               <input
//                 type="text"
//                 placeholder="Cari pengguna..."
//                 value={searchTerm}
//                 onChange={handleSearch}
//                 className="form-control"
//               />
//             </div>

//             {/* <input type="number" /> */}
//           </div>
//           <div className="datatable-container">
//             <table
//               className="table table-bordered dataTable"
//               id="dataTable"
//               cellSpacing="0">
//               <thead>
//                 <tr>
//                   <th>User Id</th>
//                   <th>Name</th>
//                   <th>Nip</th>
//                   <th>Role</th>
//                   <th>Status</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredUsers.map((user) => (
//                   <tr key={user.usrid}>
//                     <td>{user.usruserid}</td>
//                     <td>{user.usrname}</td>
//                     <td>{user.usrnip}</td>
//                     <td>{user.usrsupervisor}</td>
//                     <td>{user.usrstatusformat}</td>
//                     <td>
//                       <button
//                         className="btn btn-success btn-sm"
//                         onClick={() => editUser(user.usruserid)}>
//                         Edit
//                       </button>
//                       <button
//                         className="btn btn-danger btn-sm ml-1"
//                         onClick={() => handleDeleteUser(user.usruserid)}>
//                         Hapus
//                       </button>
//                       {user.usrstatusformat === "Active" ? (
//                         <button className="btn btn-warning btn-sm ml-1">
//                           Active
//                         </button>
//                       ) : (
//                         <></>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             {/* Pagination */}
//             <nav>
//               <div className="pagination-item d-flex justify-content-between">
//                 <div className="page-1"></div>
//                 <div className="page-2">
//                   {" "}
//                   <ul className="pagination">
//                     {users.map((user, index) => (
//                       <li className="page-item" key={index}>
//                         <button
//                           className={`page-link ${
//                             currentPage === index + 1 ? "active" : ""
//                           }`}
//                           onClick={() => paginate(index + 1)}>
//                           {index + 1}
//                         </button>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             </nav>
//           </div>
//         </div>
//       </div>

//       <Modal isOpen={isModalOpen} onClose={closeModal} reload={getUserList}>
//         <button onClick={closeModal}>Tutup Modal</button>
//       </Modal>

//       {userEdit !== undefined ? (
//         <ModalEdit
//           isOpen={isModalOpenEdit}
//           onClose={closeModalEdit}
//           currentUser={userEdit}
//           reload={getUserList}
//         />
//       ) : (
//         <></>
//       )}

//       {/*  modal edit */}

//       {/* {isModalOpenEdit ? (
//         <ModalEdit
//           isOpen={isModalOpenEdit}
//           onClose={closeModalEdit}
//           currentUser={userEdit}
//         />
//       ) : (
//         <></>
//       )} */}
//     </div>
//   );
// };

// export default Demo;
