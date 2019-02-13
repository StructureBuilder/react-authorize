import React, { Component } from 'react';
import {
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import renderAuthorized from "../../../../es";
import One from '../../pages/One';
import Two from '../../pages/Two';
import Three from '../../pages/Three';
import Unauthorized from '../../pages/Unauthorized';

const Loading = () => (
  <div>Loading...</div>
);

const {secured} = renderAuthorized({
  permissions: 'admin',
});

// const AuthorizedRoute = props => (
//   <Authorized
//     permissions="admin"
//     unauthorized={<Unauthorized />}
//     loading={<Loading />}
//     {...props}
//   >
//     <Route path="/three" component={Three} />
//   </Authorized>
// );

export default class BasicLayout extends Component {
  state = {
    authority: 'admin',
  };

  changeAuthority = () => {
    this.setState(({authority}) => ({
      authority: authority === 'admin' ? 'user' : 'admin',
    }));
  }

  render() {
    const {authority} = this.state;
    const AuthorizedRoute = secured({
      authority,
      unauthorized: <Unauthorized />,
      loading: <Loading />,
    })(() => <Route path="/three" component={Three} />);

    return (
      <div>
        <ul>
          <li>
            <Link to="/one">one</Link>
          </li>
          <li>
            <Link to="/two">two</Link>
          </li>
          <li>
            <Link to="/three">three</Link>
          </li>
          <li onClick={this.changeAuthority}>Change authority</li>
        </ul>

        <div>
          <Switch>
            <Route path="/one" component={One} />
            <Route path="/two" component={Two} />
            <AuthorizedRoute />
          </Switch>
        </div>
      </div>
    );
  }
}
