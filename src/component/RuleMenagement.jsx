import React from "react";

const RuleMenagement = () => {
  return (
    <div className="card shadow mb-4">
      <div className="card-header d-flex justify-content-between mb-2">
        <div className="test">
          <h4> Role Menagement</h4>
        </div>
        <div className="btn-new">
          <button
            className="btn btn-primary"
            //   onClick={openModal}
          >
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
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Description</th>
                  <th className="py-3 px-6 text-center">Status</th>
                  <th className="py-3 px-6 text-center">User</th>
                  <th className="py-3 px-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light border-b">
                {/* {filteredUsers.map((user) => (
                  <tr
                    key={user.usrid}
                    className=" transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
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
                      {user.usrstatusformat === "Active" ? (
                        <button className="btn btn-warning btn-sm ml-1">
                          Active
                        </button>
                      ) : (
                        <></>
                      )}
                    </td>
                  </tr>
                ))} */}
              </tbody>
            </table>
            {/* Pagination */}
            <nav className="mt-2">
              <div className="pagination-item d-flex justify-content-between">
                <div className="page-1"></div>
                <div className="page-2">
                  {" "}
                  <ul className="pagination">
                    {/* {users.map((user, index) => (
                      <li className="page-item" key={index}>
                        <button
                          className={`page-link ${
                            currentPage === index + 1 ? "active" : ""
                          }`}
                          onClick={() => paginate(index + 1)}>
                          {index + 1}
                        </button>
                      </li>
                    ))} */}
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* <Modal isOpen={isModalOpen} onClose={closeModal} reload={getUserList}>
        <button onClick={closeModal}>Tutup Modal</button>
      </Modal> */}

      {/*    
      {userEdit !== undefined ? (
        <ModalEdit
          isOpen={isModalOpenEdit}
          onClose={closeModalEdit}
          currentUser={userEdit}
          reload={getUserList}
        />
      ) : (
        <></>
      )} */}

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

export default RuleMenagement;
