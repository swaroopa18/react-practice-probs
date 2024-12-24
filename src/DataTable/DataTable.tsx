import React, { useState } from 'react';
import persons from './data/users.json';

export default function DataTable() {
  const [message, setMessage] = useState('Data Table');
  const totalCount = persons.length
  const [tableCount, setTableCount] = useState(5)
  const [users, setUsers] = useState(persons.slice(0, tableCount))
  const [pageNumber, setPageNumber] = useState(1)
  const [totalPages, setTotalPages] = useState(Math.ceil(totalCount / 5))

  const getPaginatedUsers = (page, count) => {
    const start = count * (page - 1);
    const end = count * page;
    return persons.slice(start, end);
  };

  const handleSelect = (event) => {
    const tableCount = parseInt(event.target.value)
    setTableCount(tableCount)
    setUsers(persons.slice(0, tableCount))
    setTotalPages(Math.ceil(totalCount / tableCount))
    setPageNumber(1)
  }

  const onNextClick = () => {
    setPageNumber((prev) => {
      const newPage = prev + 1;
      setUsers(getPaginatedUsers(newPage, tableCount));
      return newPage;
    });
  };

  const onPrevClick = () => {
    setPageNumber((prev) => {
      const newPage = prev - 1;
      setUsers(getPaginatedUsers(newPage, tableCount));
      return newPage;
    });
  };


  const columns = [
    { label: 'ID', key: 'id' },
    { label: 'Name', key: 'name' },
    { label: 'Age', key: 'age' },
    { label: 'Occupation', key: 'occupation' },
  ];

  return (
    <div>
      <h1>{message}</h1>
      <table>
        <thead>
          <tr>
            {columns.map(({ label, key }) => (
              <th key={key}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map(({ id, name, age, occupation }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{age}</td>
              <td>{occupation}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <footer>
        <select onChange={handleSelect}>
          <option value='5'>Show 5</option>
          <option value='10'>Show 10</option>
          <option value='20'>Show 20</option>
        </select>
        {' '}
        <button disabled={pageNumber === 1} onClick={onPrevClick}>Prev</button>
        {` Page ${pageNumber} of ${totalPages} `}
        <button disabled={pageNumber === totalPages} onClick={onNextClick}>Next</button>
      </footer>
    </div>
  );
}
