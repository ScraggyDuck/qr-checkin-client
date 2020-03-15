import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import Register from './components/register';
import ScannerQR from './components/login';
import History from './components/history';

// Routes

function App () {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Redirect to='/scanner-qr' />
          </Route>
          <Route path='/register' component={Register} />
          <Route path='/scanner-qr' component={ScannerQR} />
          <Route path='/checkin-history' component={History} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
