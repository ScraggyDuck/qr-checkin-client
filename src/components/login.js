import React, { Component } from 'react';
import QrReader from 'react-qr-reader';

import { toastSuccess, toastError } from '../utils/toastHelper';
import { ToastContainer } from 'react-toastify';

import userServices from '../services/user.services';
import attendanceServices from '../services/attendance.service';

import { NavLink } from 'react-router-dom';

export default class ScannerQR extends Component {
  handleScan = async userId => {
    if (userId) {
      let user = await userServices.checkUser(userId);
      if (user) {
        const isCheckIn = await attendanceServices.isCheckIn(userId);
        if (isCheckIn) {
          attendanceServices
            .createAttendance({
              fullName: user.fullName,
              userId: user._id,
              isCheckIn: false
            })
            .then(res => {
              console.log(res);
              toastSuccess('Đăng xuất thành công!');
            })
            .catch(err => toastError(err));
        } else {
          attendanceServices
            .createAttendance({
              fullName: user.fullName,
              userId: user._id,
              isCheckIn: true
            })
            .then(res => toastSuccess('Đăng nhập thành công!'))
            .catch(err => toastError(err));
        }
      }
    }
  };

  handleError = err => {
    console.error(err);
  };

  render() {
    return (
      <div className='container'>
        <div className='row px-2 h-100 justify-content-center align-items-center'>
          <div className='col-md-6 text-center box-container'>
            <NavLink to='/register' className='btn mb-3  btn-primary'>
              Register
            </NavLink>
            <NavLink
              to='/checkin-history'
              className='btn mb-3 ml-3 btn-primary'>
              History
            </NavLink>
            <h3 className='title'>Check In bằng QR Code</h3>
            <div className='mx-3'>
              <QrReader
                delay={1000}
                onError={this.handleError}
                onScan={this.handleScan}
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}
