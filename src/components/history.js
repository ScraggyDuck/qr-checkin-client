import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import attendanceServices from '../services/attendance.service';

import '../styles/history.scss';

export default function History () {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function fetchData () {
      const historyData = await attendanceServices.getAll();
      setHistory(historyData);
      return historyData;
    }
    fetchData();
  }, []);

  const renderHistory = () => {
    let result = null;
    result = history.map(item => {
      let date = new Date(item.createdAt).toLocaleString('en-GB', { timeZone: 'UTC' })
      return (
        <div className={`alert mb-3 ${item.isCheckIn ? 'alert-success' : 'alert-warning'}`} role='alert' key={item._id}>
          {item.fullName} đã {item.isCheckIn ? 'check in' : 'check out'} vào lúc
          : {date}
        </div>
      );
    });
    return result;
  };


  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-12'>
          <div className="card mt-5">
            <h5 className="card-header bg-success text-white">
              Lịch sử
              <NavLink
                to='/scanner-qr'
                className='d-block float-right btn-back text-reset'>
                Trở về
                <i className="ml-2 fa fa-arrow-right" aria-hidden="true"></i>
              </NavLink>
            </h5>
            <div className="card-body">
              {renderHistory()}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
