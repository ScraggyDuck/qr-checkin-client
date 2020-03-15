import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import QRCode from 'qrcode.react';
import userServices from '../services/user.services';

function Register () {
  const [fullName, setFullName] = useState('');
  const [qrCode, setQrCode] = useState(null);

  const generateQRCode = async () => {
    const user = { fullName };
    const { data } = await userServices.createUser(user);

    setQrCode(
      <QRCode
        id='qrcode'
        value={data._id}
        size={290}
        level={'H'}
        includeMargin={true}
      />
    );
  };

  const downloadQR = () => {
    const canvas = document.getElementById('qrcode');
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    let downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = 'qr.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className='container mt-5'>
      <div className='row'>
        {/* Register Form */}
        <div className='col-md-6'>
          <div className='form-group'>
            <label htmlFor='fullName'>Full Name: </label>
            <input
              type='text'
              className='form-control'
              id='fullName'
              value={fullName}
              onChange={e => setFullName(e.target.value)}
            />
          </div>
          <button onClick={generateQRCode} className='btn btn-primary'>
            Generate QR
          </button>
          <NavLink to='/scanner-qr' className='btn ml-3 btn-primary'>
            Login
          </NavLink>
        </div>

        {/* Display registered user information */}
        <div className='col-md-6 text-center'>
          {qrCode}
          {qrCode && (
            <a
              href='#download'
              className='btn btn-primary mt-3 d-block text-white'
              role='button'
              onClick={downloadQR}>
              {' '}
              Download QRCode
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default Register;
