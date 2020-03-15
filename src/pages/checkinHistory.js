import React, { useState, useEffect } from 'react';
import attendanceServices from '../services/attendance.service';

export default function CheckinHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const historyData = await attendanceServices.getAll();
      setHistory(historyData);
      return historyData;
    }
    fetchData();
  }, []);

  const renderHistory = () => {
    let result = null;
    result = history.map(item => {
      return (
        <div className='alert alert-success mb-3' role='alert' key={item._id}>
          {item.fullName} đã {item.isCheckIn ? 'check in' : 'check out'} vào lúc
          : {item.createdAt}
        </div>
      );
    });
    return result;
  };

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-12'>{renderHistory()}</div>
      </div>
    </div>
  );
}
