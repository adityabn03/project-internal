import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import { getToken } from "../API/api";
import Modal from "./Modal";
import ModalEdit from "./ModalEdit";
import axios from "axios";
import Swal from "sweetalert2";
import DataTable from 'datatables.net';
import $ from 'jquery';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
// import { BsFillPersonPlusFill } from "react-icons/bs";
// import { ImSearch } from "react-icons/im";

const UserMenagement = () => {
  const [users, setUsers] = useState([]);

  console.log(users);
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
  
      // Inisialisasi DataTable setelah mendapatkan data
      $('#dataTable').DataTable();
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
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Menghitung indeks item pertama dan item terakhir
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Mengambil data yang sesuai dengan halaman saat ini
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  // ! Menghitung jumlah total halaman
  const totalPages = Math.ceil(users.length / itemsPerPage);

  // Mengubah halaman saat tombol halaman diklik
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Mengubah jumlah item per halaman saat pilihan entri data berubah
  const handleEntriesChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Mengatur halaman kembali ke halaman pertama
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

  const handleRowsPerPageChange = (event) => {
    setUsersPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };

  return (
  
        <div class="py-8">
            <div>
                <h2 class="text-2xl font-semibold leading-tight">Users</h2>
            </div>

    <div className="card shadow mb-4">
      <div className="card-header d-flex justify-content-between mb-2">
        <div className="test">
          <h4> User Management</h4>
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
            <div className="page-iittem">
              <div className="page-item">
                <span>Show entries:</span>
                <select
                  value={itemsPerPage}
                  onChange={handleEntriesChange}
                  className="form-control">
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>
            <div className="page-iittem">
              <input
                type="text"
                placeholder="Search by Name"
                // value={searchTerm}
                // onChange={handleSearch}
                className="form-control"
              />
            </div>

            {/* <input type="number" /> */}
          </div>
          <div className="datatable-container">
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">User Id</th>
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-center">Nip</th>
                  <th className="py-3 px-6 text-center">Role</th>
                  <th className="py-3 px-6 text-center">Status</th>
                  <th className="py-3 px-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light border-b">
                {currentItems.map((user) => (
                  <tr
                    key={user.usrid}
                    className=" transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 white:hover:bg-neutral-600">
                    <td className="py-3 px-6 text-left whitespace-nowrap font-semibold">
                      {user.usruserid}
                    </td>
                    <td className="py-3 px-6 text-left  whitespace-nowrap font-semibold">
                      {user.usrname}
                    </td>
                    <td className="py-3 px-6 text-center whitespace-nowrap font-semibold">
                      {user.usrnip}
                    </td>
                    <td className="py-3 px-6 text-center whitespace-nowrap font-semibold">
                      {user.usraccesslevel}
                    </td>
                    <td className="py-3 px-6 text-center  whitespace-nowrap font-semibold ">
                      {user.usrstatusformat}
                    </td>
                    <td className="py-3 px-6 text-center  whitespace-nowrap ">
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
                      {user.usrstatusformat !== "Active" ? (
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
            <nav className="mt-2">
              <div className="pagination-item d-flex justify-content-between">
                <div className="page-1"></div>
                <div className="page-2">
                  <nav aria-label="Page navigation example">
                    <ul class="inline-flex -space-x-px">
                      <li>
                        <button
                          className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}>
                          Previous
                        </button>
                      </li>
                      <li>
                        {Array.from(
                          { length: totalPages },
                          (_, index) => index + 1
                        ).map((pageNumber) => (
                          <button
                            className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                            disabled={pageNumber === currentPage}>
                            {pageNumber}
                          </button>
                        ))}
                      </li>
                      <li>
                        <button
                          className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}>
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} reload={getUserList}>
        {/* <button onClick={closeModal}>Tutup Modal</button> */}
      </Modal>

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
