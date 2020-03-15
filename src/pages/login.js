import React, { Component } from 'react';
import QrReader from 'react-qr-reader';

import { NavLink } from 'react-router-dom';

export default class ScannerQR extends Component {
  state = {
    result: 'No result'
  };

  handleScan = data => {
    if (data) {
      this.setState({
        result: data
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
            <QrReader
              delay={300}
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
