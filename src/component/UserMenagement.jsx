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

  const handleRowsPerPageChange = (event) => {
    setUsersPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div class="antialiased font-sans bg-gray-200">
    <div class="container mx-auto px-4 sm:px-8">
        <div class="py-8">
            <div>
                <h2 class="text-2xl font-semibold leading-tight">Users</h2>
            </div>
            <div class="my-2 flex sm:flex-row flex-col">
                <div class="flex flex-row mb-1 sm:mb-0">
                <div class="relative">
                <select
                  value={usersPerPage}
                  onChange={handleRowsPerPageChange}
                  class="appearance-none h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option>5</option>
                  <option>10</option>
                  <option>20</option>
                </select>
              </div>
                </div>
                <div class="block relative">
                    <span class="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                        <svg viewBox="0 0 24 24" class="h-4 w-4 fill-current text-gray-500">
                            <path
                                d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                            </path>
                        </svg>
                    </span>
                    <input
  placeholder="Search"
  className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
  value={searchTerm}
  onChange={handleSearch}
/>
                </div>
            </div>
            <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <table class="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th
                                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    User Id
                                </th>
                                <th
                                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Name
                                </th>
                                <th
                                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    NIP
                                </th>
                                <th
                                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Status
                                </th>
                                <th
                                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Status
                                </th>
                                <th
                                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light border-b">
                    {filteredUsers.map((user) => (
                  <tr
                    key={user.usrid}
                    className=" transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 white:hover:bg-neutral-600">
                    <td className="py-5 px-5 text-left whitespace-nowrap font-semibold">
                      {user.usruserid}
                    </td>
                    <td className="py-5 px-5 text-left  whitespace-nowrap font-semibold">
                      {user.usrname}
                    </td>
                    <td className="py-5 px-5 text-center whitespace-nowrap font-semibold">
                      {user.usrnip}
                    </td>
                    <td className="py-5 px-5 text-center whitespace-nowrap font-semibold">
                      {user.usraccesslevel}
                    </td>
                    <td className="py-5 px-5 text-center  whitespace-nowrap font-semibold ">
                      {user.usrstatusformat}
                    </td>
                    <td className="py-3 px-5 text-center  whitespace-nowrap ">
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
                    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
  <div className="flex flex-1 justify-between sm:hidden">
    <button
      onClick={() => paginate(currentPage - 1)}
      disabled={currentPage === 1}
      className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
    >
      Previous
    </button>
    <button
  onClick={() => paginate(currentPage + 1)}
  disabled={indexOfLastUser >= users.length}
  className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
>
  Next
</button>
  </div>
  <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
    <div>
      <p className="text-sm text-gray-700">
        Showing <span className="font-medium">{indexOfFirstUser + 1}</span> to{' '}
        <span className="font-medium">{indexOfLastUser}</span> of{' '}
        <span className="font-medium">{users.length}</span> results
      </p>
    </div>
    <div>
      <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
      <button
  onClick={() => paginate(currentPage - 1)}
  disabled={currentPage === 1}
  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
>
  <span className="sr-only">Previous</span>
  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
</button>
{currentPage > 1 && (
  <button
    onClick={() => paginate(currentPage - 1)}
    disabled={currentPage === 1}
    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
  >
    {currentPage - 1}
  </button>
)}
<a
  href="#"
  aria-current="page"
  className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
>
  {currentPage}
</a>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastUser >= users.length}
          className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        >
          {currentPage + 1}
        </button>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastUser >= users.length}
          className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        >
          <span className="sr-only">Next</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </nav>
    </div>
  </div>
</div>

                </div>
            </div>
        </div>
    </div>
</div>
    // <div className="card shadow mb-4">
    //   <div className="card-header d-flex justify-content-between mb-2">
    //     <div className="test">
    //       <h4> User Management</h4>
    //     </div>
    //     <div className="btn-new">
    //       <button className="btn btn-primary" onClick={openModal}>
    //         Add new
    //       </button>
    //     </div>
    //   </div>

    //   <div className="card-body">
    //     <div className="datatable-wrapper datatable-loading no-footer sortable searchable fixed-columns">
    //       <div className="datatable-top mb-3 d-flex justify-content-between">
    //         <div className="page-iittem"></div>
    //         <div className="page-iittem">
    //           <input
    //             type="text"
    //             placeholder="Search by Name"
    //             value={searchTerm}
    //             onChange={handleSearch}
    //             className="form-control"
    //           />
    //         </div>

    //         {/* <input type="number" /> */}
    //       </div>
    //       <div className="datatable-container">
    //         <table className="min-w-max w-full table-auto">
    //           <thead>
    //             <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
    //               <th className="py-3 px-6 text-left">User Id</th>
    //               <th className="py-3 px-6 text-left">Name</th>
    //               <th className="py-3 px-6 text-center">Nip</th>
    //               <th className="py-3 px-6 text-center">Role</th>
    //               <th className="py-3 px-6 text-center">Status</th>
    //               <th className="py-3 px-6 text-center">Action</th>
    //             </tr>
    //           </thead>
    //           <tbody className="text-gray-600 text-sm font-light border-b">
    //             {filteredUsers.map((user) => (
    //               <tr
    //                 key={user.usrid}
    //                 className=" transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 white:hover:bg-neutral-600">
    //                 <td className="py-3 px-6 text-left whitespace-nowrap font-semibold">
    //                   {user.usruserid}
    //                 </td>
    //                 <td className="py-3 px-6 text-left  whitespace-nowrap font-semibold">
    //                   {user.usrname}
    //                 </td>
    //                 <td className="py-3 px-6 text-center whitespace-nowrap font-semibold">
    //                   {user.usrnip}
    //                 </td>
    //                 <td className="py-3 px-6 text-center whitespace-nowrap font-semibold">
    //                   {user.usraccesslevel}
    //                 </td>
    //                 <td className="py-3 px-6 text-center  whitespace-nowrap font-semibold ">
    //                   {user.usrstatusformat}
    //                 </td>
    //                 <td className="py-3 px-6 text-center  whitespace-nowrap ">
    //                   <button
    //                     className="btn btn-success btn-sm"
    //                     onClick={() => editUser(user.usruserid)}>
    //                     Edit
    //                   </button>
    //                   <button
    //                     className="btn btn-danger btn-sm ml-1"
    //                     onClick={() => handleDeleteUser(user.usruserid)}>
    //                     Hapus
    //                   </button>
    //                   {user.usrstatusformat !== "Active" ? (
    //                     <button className="btn btn-warning btn-sm ml-1">
    //                       Active
    //                     </button>
    //                   ) : (
    //                     <></>
    //                   )}
    //                 </td>
    //               </tr>
    //             ))}
    //           </tbody>
    //         </table>
    //         {/* Pagination */}
            // <nav className="mt-2">
            //   <div className="pagination-item d-flex justify-content-between">
            //     <div className="page-1"></div>
            //     <div className="page-2">
            //       {" "}
            //       <ul className="pagination">
            //         {users.map((user, index) => (
            //           <li className="page-item" key={index}>
            //             <button
            //               className={`page-link ${
            //                 currentPage === index + 1 ? "active" : ""
            //               }`}
            //               onClick={() => paginate(index + 1)}>
            //               {index + 1}
            //             </button>
            //           </li>
            //         ))}
            //       </ul>
            //     </div>
            //   </div>
            // </nav>
    //       </div>
    //     </div>
    //   </div>

    //   <Modal isOpen={isModalOpen} onClose={closeModal} reload={getUserList}>
    //     {/* <button onClick={closeModal}>Tutup Modal</button> */}
    //   </Modal>

    //   {userEdit !== undefined ? (
    //     <ModalEdit
    //       isOpen={isModalOpenEdit}
    //       onClose={closeModalEdit}
    //       currentUser={userEdit}
    //       reload={getUserList}
    //     />
    //   ) : (
    //     <></>
    //   )}
    // </div>
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
