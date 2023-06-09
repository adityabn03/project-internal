import React from "react";

const DemoTable = () => {
  return (
    <div>
      <div className="container w-full md:w-4/5 xl:w-3/5 mx-auto px-2">
        <h1 className="flex items-center font-sans font-bold break-normal text-indigo-500 px-2 py-8 text-xl md:text-2xl">
          Responsive
          <a className="underline mx-2" href="https://datatables.net/">
            DataTables.net
          </a>
          Table
        </h1>

        <div
          id="recipients"
          className="p-8 mt-6 lg:mt-0 rounded shadow bg-white">
          <table id="example" className="stripe hover">
            <thead>
              <tr>
                <th data-priority="1">Name</th>
                <th data-priority="2">Position</th>
                <th data-priority="3">Office</th>
                <th data-priority="4">Age</th>
                <th data-priority="5">Start date</th>
                <th data-priority="6">Salary</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tiger Nixon</td>
                <td>System Architect</td>
                <td>Edinburgh</td>
                <td>61</td>
                <td>2011/04/25</td>
                <td>$320,800</td>
              </tr>

              <tr>
                <td>Donna Snider</td>
                <td>Customer Support</td>
                <td>New York</td>
                <td>27</td>
                <td>2011/01/25</td>
                <td>$112,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DemoTable;
