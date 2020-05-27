import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import Booking from './Pages/Booking/Booking'
import './App.css';
function App() {

  return (
    <main>
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/booking" component={Booking} />
        {/* <Route component={Error} /> */}
      </Switch>
    </main>
  );
}

export default App;
