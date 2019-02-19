import React, { Component } from 'react';
import {
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import {renderAuthorized} from "../../../../es";
import One from '../../pages/One';
import Two from '../../pages/Two';
import Three from '../../pages/Three';
import Unauthorized from '../../pages/Unauthorized';

const Loading = () => (
  <div>Loading...</div>
);

const {check} = renderAuthorized({
  permissions: undefined,
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
      authority: authority === 'admin' ? undefined : 'admin',
    }));
  }

  render() {
    const {authority} = this.state;
    const AuthorizedRoute = check({
      authority,
      unauthorized: <Unauthorized />,
      loading: <Loading />,
      children: <Route path="/three" component={Three} />,
    });

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
            {AuthorizedRoute}
          </Switch>
        </div>
      </div>
    );
  }
}
