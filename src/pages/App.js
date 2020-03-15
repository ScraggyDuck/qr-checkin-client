import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Register from './register';
import ScannerQR from './login';

// Routes

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/register' component={Register} />
          <Route path='/scanner-qr' component={ScannerQR} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
