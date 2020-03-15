import React, { Component } from 'react';
import QrReader from 'react-qr-reader';

import userServices from '../services/user.services';
import attendanceServices from '../services/attendance.service';

import { NavLink } from 'react-router-dom';

export default class ScannerQR extends Component {
  state = {
    result: 'No result'
  };

  handleScan = async userId => {
    if (userId) {
      let result = 'Dang nhap that bai';
      let user = await userServices.checkUser(userId);
      if (user) {
        const isCheckIn = await attendanceServices.isCheckIn(userId);
        console.log(isCheckIn);

        if (isCheckIn) {
          attendanceServices.createAttendance({
            fullName: user.fullName,
            userId: user._id,
            isCheckIn: false
          });
          result = 'Dang xuat thanh cong';
        } else {
          attendanceServices.createAttendance({
            fullName: user.fullName,
            userId: user._id,
            isCheckIn: true
          });
          result = 'Dang nhap thanh cong';
        }
      }

      this.setState({
        result
      });
    }
  };

  handleError = err => {
    console.error(err);
  };

  render() {
    return (
      <div className='container mt-5'>
        <div className='row justify-content-center'>
          <div className='col-md-6 text-center'>
            <NavLink to='/register' className='btn mb-3  btn-primary'>
              Register
            </NavLink>
            <NavLink
              to='/checkin-history'
              className='btn mb-3 ml-3 btn-primary'>
              History
            </NavLink>
            <QrReader
              delay={1000}
              onError={this.handleError}
              onScan={this.handleScan}
              style={{ width: '100%' }}
            />
            <h3 className='mt-3'>{this.state.result}</h3>
          </div>
        </div>
      </div>
    );
  }
}
