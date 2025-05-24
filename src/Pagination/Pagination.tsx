import React, { useState, useEffect } from "react";
import "./App.css";

interface EmployeeDetail {
  id: string;
  name: string;
  designation: string;
}
// Mock API to fetch employee IDs
const fetchEmployeeIds = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        employeeIds: Array.from({ length: 20 }, (_, x) => x + 100),
      });
    }, 1000);
  });
};

// Mock API to fetch employee details by ID
const fetchEmployeeData = (id):Promise<EmployeeDetail> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id,
        name: `Employee-${id}`,
        designation: "Software Engineer",
      });
    }, 1000);
  });
};

const App = () => {
  const [employees, setEmployees] = useState<EmployeeDetail[]>([]); // Current employees for the page
  const [ids, setIds] = useState<string[]>([]); // All employee IDs
  const [currentPage, setCurrentPage] = useState(0); // Current page
  const [loading, setLoading] = useState(false); // Loading state
  const itemsPerPage = 6; // Number of employees per page

  useEffect(() => {
    // Fetch employee IDs on initial load
    fetchEmployeeIds().then((data) => {
      setIds(data.employeeIds);
    });
  }, []);

  useEffect(() => {
    // Fetch employee details for the current page
    const fetchEmployeesForPage = async () => {
      setLoading(true);
      const startIndex = currentPage * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const idsToFetch = ids.slice(startIndex, endIndex);

      // Fetch details for the current page IDs
      const employeeData = await Promise.all(
        idsToFetch.map((id) => fetchEmployeeData(id))
      );
      setEmployees(employeeData);
      setLoading(false);
    };

    if (ids.length > 0) {
      fetchEmployeesForPage();
    }
  }, [currentPage, ids]);

  const onPagination = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  return (
    <div className="container">
      <h1>Employee List</h1>
      {loading && <p>Loading...</p>}
      {!loading && employees.length > 0 && (
        <ul>
          {employees.map((employee) => (
            <li key={employee.id}>
              <p>Name: {employee.name}</p>
              <p>Designation: {employee.designation}</p>
            </li>
          ))}
        </ul>
      )}
      <div className="pagination">
        <button
          onClick={() => onPagination(currentPage - 1)}
          disabled={currentPage === 0}
        >
          {"<"}
        </button>
        {Array.from(
          { length: Math.ceil(ids.length / itemsPerPage) },
          (_, index) => (
            <button
              key={index}
              onClick={() => onPagination(index)}
              className={currentPage === index ? "active" : ""}
            >
              {index + 1}
            </button>
          )
        )}
        <button
          onClick={() => onPagination(currentPage + 1)}
          disabled={currentPage === Math.ceil(ids.length / itemsPerPage) - 1}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default App;
