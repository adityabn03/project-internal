import React, { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import axios from "axios";
import { getToken } from "../API/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { BiReset } from "react-icons/bi";

const Modal = ({ isOpen, onClose, currentUser, reload }) => {
  const [token, setToken] = useState();
  const [users, setUser] = useState(currentUser);
  console.log(users);
  const [isChecked, setIsChecked] = useState(false);
  const [branch, setBranch] = useState([]);
  const [superVisior, setSupervisior] = useState([]);
  const [role, setRole] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [tampungDate, settampungDate] = useState(users.usrefectivedate);

  const getTokenApi = () => {
    getToken().then((e) => {
      setToken(e);
    });
  };

  useEffect(() => {
    getTokenApi();
    setUser(currentUser);
    DropDown();
    DropDownSv();
    DropDownRl();
  }, [currentUser]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const dataEditUser = {
    p_usrid: users.usruserid,
    p_name: users.usrname,
    p_nip: users.usrnip,
    p_email: users.usremail,
    p_notlp: users.usrnotlp,
    p_branchcode: users.usrbranch,
    p_spv: users.usrsupervisor,
    p_position: users.usrposition,
    p_acclevel: "administrator",
    p_efectivedate: "2019-06-03",
    p_status: "True",
    p_usr: "bani",
    p_defaultpwd: "",
    p_logid: "13",
  };

  const EditUser = async () => {
    try {
      await axios.post(
        "http://116.206.196.65:30983/skycore/User/postJDataEditRecord",
        JSON.stringify(dataEditUser),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire("Save Berhasil", "", "success");
      reload();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  //!--- Dropdown ddl branch------
  const hitDropdown = {
    type: "branch",
    usr: "crm_admin",
  };

  const DropDown = async () => {
    try {
      const listDropdown = await axios.post(
        "http://116.206.196.65:30983/skycore/User/postJDataCallParameterDDL",
        JSON.stringify(hitDropdown),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const cekData = listDropdown.data.data.map((e) => {
        return e;
      });

      // console.l.usrnotlp
      setBranch(cekData);
    } catch (error) {
      console.log(error);
    }
  };

  //! dropdown ddl supervisor
  const hitDropdownSv = {
    type: "supervisor",
    usr: "crm_admin",
  };

  const DropDownSv = async () => {
    try {
      const listDropdown = await axios.post(
        "http://116.206.196.65:30983/skycore/User/postJDataCallParameterDDL",
        JSON.stringify(hitDropdownSv),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const cekData = listDropdown.data.data.map((e) => {
        return e;
      });

      // console.log(cekData);
      setSupervisior(cekData);
    } catch (error) {
      console.log(error);
    }
  };

  //! dropdown ddl Role
  const hitDropdownRl = {
    type: "level",
    usr: "crm_admin",
  };

  const DropDownRl = async () => {
    try {
      const listDropdown = await axios.post(
        "http://116.206.196.65:30983/skycore/User/postJDataCallParameterDDL",
        JSON.stringify(hitDropdownRl),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const cekData = listDropdown.data.data.map((e) => {
        return e;
      });

      console.log(cekData);
      setRole(cekData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const checkBoxStyle = {
    margin: 0,
  };

  if (!isOpen) return null;
  return (
    <div class="fixed inset-0 flex items-center justify-center z-50">
      <div class="absolute bg-white p-6 rounded-lg shadow-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">User Edit</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}></button>
          </div>
          <div className="modal_body">
            <form>
              <div className="row">
                <div className="col-6">
                  {" "}
                  <div className=" row mb-1">
                    <div className="col-3">
                      <label for="exampleInputEmail1" class="form-label">
                        User Id
                      </label>
                    </div>
                    <div className="col-9">
                      <input
                        type="text"
                        className="form-control"
                        id="recipient-name"
                        name="usruserid"
                        value={users.usruserid}
                        onChange={handleInputChange}
                        disabled
                        // onChange={(e) => setUserId(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className=" row mb-1">
                    <div className="col-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Name <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="col-9">
                      <input
                        type="text"
                        className="form-control"
                        value={users.usrname}
                        name="usrname"
                        onChange={handleInputChange}         
                        required
                      />
                    </div>
                  </div>
                  <div className=" row mb-1">
                    <div className="col-3">
                      <label for="exampleInputEmail1" class="form-label">
                        NIP <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="col-9">
                      <input
                        type="text"
                        className="form-control"
                        id="recipient-name"
                        value={users.usrnip}
                        name="usrnip"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className=" row mb-1">
                    <div className="col-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Email <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="col-9">
                      <input
                        type="text"
                        className="form-control"
                        value={users.usremail}
                        name="usremail"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className=" row mb-1">
                    <div className="col-3">
                      <label for="exampleInputEmail1" class="form-label">
                        No Tlp <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="col-9">
                      <input
                        type="text"
                        className="form-control"
                        id="recipient-name"
                        value={users.usrnotlp}
                        name="usrnotlp"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className=" row mb-2">
                    <div className="col-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Branch
                      </label>
                    </div>
                    <div className="col-9">
                      <select
                        type="text"
                        className="form-control"
                        id="recipient-name"
                        name="usrbranch"
                        value={users.usrbranch}
                        onChange={handleInputChange}>
                        {branch.map((item, i) => {
                          return (
                            <option value={item.namevalue} key={i}>
                              {item.nameview}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className=" row mb-1">
                    <div className="col-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Supervisor Name
                      </label>
                    </div>

                    <div className="col-9">
                      <select
                        type="text"
                        className="form-control"
                        id="recipient-name"
                        name="usrsupervisor"
                        value={users.usrsupervisor}
                        onChange={handleInputChange}>
                        {superVisior.map((item, i) => {
                          return (
                            <option value={item.namevalue} key={i}>
                              {item.nameview}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className=" row mb-1">
                    <div className="col-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Role
                      </label>
                    </div>
                    <div className="col-9">
                      <select
                        type="text"
                        className="form-control"
                        id="recipient-name"
                        name="usraccesslevel"
                        value={users.usraccesslevel}
                        onChange={handleInputChange}>
                        {role.map((item, i) => {
                          return (
                            <option value={item.namevalue} key={i}>
                              {item.nameview}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className=" row mb-1">
                    <div className="col-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Status
                      </label>
                    </div>
                    <div className="col-9">
                      <input
                        class="form-check-input mt-0"
                        type="checkbox"
                        style={checkBoxStyle}
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                      />
                    </div>
                  </div>
                  <div className=" row mb-1">
                    <div className="col-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Effective Date
                      </label>
                    </div>
                    <div className="col-9">
                      <DatePicker
                        className="form-control"
                        value={users.usrefectivedate}
                        name="usrefectivedate"
                        onChange={(event) => handleInputChange(event, users.usrefectivedate)}
                        
                        // onChange={(date) => setStartDate(date)}
                      />
                    </div>
                  </div>
                  <div className=" row mb-1">
                    <div className="col-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Password
                      </label>
                    </div>
                    <div className="col-9">
                      <input
                        type="text"
                        className="form-control"
                        id="recipient-name"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={onClose}>
              Close
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              // onClick={EditUser}
              >
              Save changes
            </button>
          </div>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

// import React, { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Swal from "sweetalert2";
// import axios from "axios";
// import { getToken } from "../API/api";

// const ModalEdit = ({ isOpen, onClose, currentUser, reload }) => {
//   const [token, setToken] = useState();
//   const [detaiUserParam, setDetaiUserParam] = useState(currentUser);

//   console.log(detaiUserParam);
//   const [users, setUser] = useState();
//   console.log(users);
//   const [isChecked, setIsChecked] = useState(false);

//   const [userId, setUserId] = useState("false");
//   const [name, setName] = useState("");

//   const getTokenApi = () => {
//     getToken().then((e) => {
//       setToken(e);
//     });
//   };

//   useEffect(() => {
//     getTokenApi();
//     setDetaiUserParam(currentUser);
//     getUserDetail();
//   }, [currentUser]);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setUser((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const getUserDetail = async () => {
//     try {
//       const listUserDetail = await axios.get(
//         "http://116.206.196.65:30983/skycore/User/getDataUser/" +
//           detaiUserParam,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const cekData = listUserDetail.data.data.map((e) => {
//         return e;
//       });
//       console.log(cekData);
//       setUser(cekData);
//     } catch (errorUser) {
//       alert(errorUser);
//       console.log(errorUser);
//     }
//   };

//   const dataEditUser = {
//     p_usrid: userId,
//     p_name: name,
//     p_nip: "78922222",
//     p_email: "crm_test2222@gmail.com",
//     p_notlp: "08676899000",
//     p_branchcode: "1",
//     p_spv: "crm_admin",
//     p_position: "area",
//     p_acclevel: "administrator",
//     p_efectivedate: "2019-06-03 00:00:00.000",
//     p_status: "true",
//     p_usr: "bani",
//     p_defaultpwd: "",
//     p_logid: "13",
//   };

//   const EditUser = async () => {
//     try {
//       await axios.post(
//         "http://116.206.196.65:30983/skycore/User/postJDataEditRecord",
//         JSON.stringify(dataEditUser),
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       Swal.fire("Save Berhasil", "", "success");
//       reload();
//       onClose();
//     } catch (error) {
//       alert(error);
//     }
//   };

//   const handleCheckboxChange = () => {
//     setIsChecked(!isChecked);
//   };

//   const checkBoxStyle = {
//     margin: 0,
//   };
//   if (!isOpen) return null;
//   return (
//     <div className="modal" tabindex="-1">
//       <div className="modal-dialog">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title">User Edit</h5>
//             <button
//               type="button"
//               className="btn-close"
//               data-bs-dismiss="modal"
//               aria-label="Close"
//               onClick={onClose}></button>
//           </div>
//           <div className="modal-body">
//             <form>
//               <div className="row">
//                 <div className="col-6">
//                   {" "}
//                   <div className=" row mb-1">
//                     <div className="col-3">
//                       <label for="exampleInputEmail1" class="form-label">
//                         User Id
//                       </label>
//                     </div>
//                     <div className="col-9">
//                       <input
//                         type="text"
//                         className="form-control"
//                         id="recipient-name"
//                         // value={users[0].usruserid}
//                         // onChange={handleInputChange}
//                       />
//                     </div>
//                   </div>
//                   <div className=" row mb-1">
//                     <div className="col-3">
//                       <label for="exampleInputEmail1" class="form-label">
//                         Name
//                       </label>
//                     </div>

//                     <div className="col-9">
//                       <input
//                         type="text"
//                         name="name"
//                         className="form-control"
//                         id="recipient-name"
//                         value={users[0].usrname}
//                         onChange={handleInputChange}
//                       />
//                     </div>
//                   </div>
//                   <div className=" row mb-1">
//                     <div className="col-3">
//                       <label for="exampleInputEmail1" class="form-label">
//                         NIP
//                       </label>
//                     </div>
//                     <div className="col-9">
//                       <input
//                         type="text"
//                         className="form-control"
//                         id="recipient-name"
//                       />
//                     </div>
//                   </div>
//                   <div className=" row mb-1">
//                     <div className="col-3">
//                       <label for="exampleInputEmail1" class="form-label">
//                         Email
//                       </label>
//                     </div>
//                     <div className="col-9">
//                       <input
//                         type="text"
//                         className="form-control"
//                         id="recipient-name"
//                       />
//                     </div>
//                   </div>
//                   <div className=" row mb-1">
//                     <div className="col-3">
//                       <label for="exampleInputEmail1" class="form-label">
//                         No Hp
//                       </label>
//                     </div>
//                     <div className="col-9">
//                       <input
//                         type="text"
//                         className="form-control"
//                         id="recipient-name"
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-6">
//                   <div className=" row mb-1">
//                     <div className="col-3">
//                       <label for="exampleInputEmail1" class="form-label">
//                         Branch
//                       </label>
//                     </div>
//                     <div className="col-9">
//                       <input
//                         type="text"
//                         className="form-control"
//                         id="recipient-name"
//                       />
//                     </div>
//                   </div>
//                   <div className=" row mb-1">
//                     <div className="col-3">
//                       <label for="exampleInputEmail1" class="form-label">
//                         Supervisor Name
//                       </label>
//                     </div>

//                     <div className="col-9">
//                       <input
//                         type="text"
//                         className="form-control"
//                         id="recipient-name"
//                       />
//                     </div>
//                   </div>
//                   <div className=" row mb-1">
//                     <div className="col-3">
//                       <label for="exampleInputEmail1" class="form-label">
//                         Role
//                       </label>
//                     </div>
//                     <div className="col-9">
//                       <input
//                         type="text"
//                         className="form-control"
//                         id="recipient-name"
//                       />
//                     </div>
//                   </div>
//                   <div className=" row mb-1">
//                     <div className="col-3">
//                       <label for="exampleInputEmail1" class="form-label">
//                         Status
//                       </label>
//                     </div>
//                     <div className="col-9">
//                       <input
//                         class="form-check-input mt-0"
//                         type="checkbox"
//                         style={checkBoxStyle}
//                         checked={isChecked}
//                         onChange={handleCheckboxChange}
//                       />
//                     </div>
//                   </div>
//                   <div className=" row mb-1">
//                     <div className="col-3">
//                       <label for="exampleInputEmail1" class="form-label">
//                         Effective Date
//                       </label>
//                     </div>
//                     <div className="col-9">
//                       <input
//                         type="text"
//                         className="form-control"
//                         id="recipient-name"
//                       />
//                     </div>
//                   </div>
//                   <div className=" row mb-1">
//                     <div className="col-3">
//                       <label for="exampleInputEmail1" class="form-label">
//                         Password
//                       </label>
//                     </div>
//                     <div className="col-9">
//                       <input
//                         type="text"
//                         className="form-control"
//                         id="recipient-name"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </form>
//           </div>
//           <div className="modal-footer">
//             <button
//               type="button"
//               className="btn btn-secondary"
//               data-bs-dismiss="modal"
//               onClick={onClose}>
//               Close
//             </button>
//             <button
//               type="button"
//               className="btn btn-primary"
//               onClick={EditUser}>
//               Save changes
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ModalEdit;
