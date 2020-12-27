import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UpdateUser from '../../components/Update-User/UpdateUser';
import UserPage from '../../pages/User-Page/UserPage';
import AddUser from '../../components/Add-User/AddUser';

const RootRoute = () => {
    return (
    <Router>
      <Switch>
          <Route exact path='/' component={UserPage}></Route>
          <Route exact path='/add-user' component={AddUser}></Route>
          <Route exact path='/update-user' component={UpdateUser}></Route>
      </Switch>
    </Router>
  );
}
export default RootRoute;