# react-authorize

[![Build Status](https://travis-ci.org/Sam618/react-authorize.svg?branch=master)](https://travis-ci.org/Sam618/react-authorized) [![codecov](https://codecov.io/gh/Sam618/react-authorize/branch/master/graph/badge.svg)](https://codecov.io/gh/Sam618/react-authorize) [![license](https://img.shields.io/github/license/Sam618/react-authorize.svg?style=flat)](https://github.com/Sam618/react-authorize/blob/master/LICENSE) ![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/react-authorize.svg?style=flat) [![downloads](https://img.shields.io/npm/dm/react-authorize.svg?style=flat)](https://www.npmjs.com/package/react-authorize) [![npm](https://img.shields.io/npm/v/react-authorize.svg?style=flat)](https://www.npmjs.com/package/react-authorize) [![typescript](https://img.shields.io/badge/language-typescript-blue.svg)](https://www.typescriptlang.org/) [![dependencies](https://img.shields.io/badge/dependencies-none-4dc71f.svg)](https://www.npmjs.com/package/react-authorize)

Determine the presentation of related React Components by comparing existing permissions with access permissions.


## Installation
React Authorize requires React 16.3 or later.

To use React Authorize with your React app:

```bash
npm install --save react-authorize
```


## Usage
Let's take a look at a simple example.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import {Authorized} from "react-authorize";

const Unauthorized = () => (
  <div>Render the current component if it is not authorized</div>
);

ReactDOM.render(
  (
    <div>
      <Authorized
        permissions="admin"
        authority="admin"
        unauthorized={<Unauthorized />}
      >Authorize permission to render React Components</Authorized>
    </div>
  ),
  document.getElementById('root'),
);
```

When `permissions` and `authority` are the same, it means we have permission, so we render the children components; if they are not the same, there is no permission, so the `Unauthorized` components will be rendered


## API Reference

### `Authorized`
The component is used to verify the user's permissions to determine if they can view the child content.

#### Props
`permissions`: Permissions allowed by the current component.
  - `string | number | symbol`, eg: `'admin'` | `1001` | `Symbol()`
  - `Array<string | number | symbol>`, eg: `['admin', 1001, Symbol()]`
    **Note**: User permissions only need to match an item in the array to pass authorization
  - `Promise`, eg:
    ```javascript
    <Authorized
      permissions={new Promise((resolve, reject) => {
        setTimeout(() => {
          if (true) {
            // Resolved, pass authorization
            resolve();
          } else {
            // Rejected, unauthorized
            reject();
          }
        }, 1000);
      })}
    >Authorize permission to render React Components</Authorized>
    ```
  - `authority => boolean | Promise`, eg:
    - with `boolean`
      ```javascript
      <Authorized
        // Return true, pass authorization
        permissions={authority => authority === 'user'}
        authority="admin"
      >Authorize permission to render React Components</Authorized>
      ```
    - with `Promise`
      ```javascript
      <Authorized
        permissions={authority => new Promise((resolve, reject) => {
          setTimeout(() => {
            if (authority === 'user') {
              // Resolved, pass authorization
              resolve();
            } else {
              // Rejected, unauthorized
              reject();
            }
          }, 1000);
        })}
        authority="admin"
      >Authorize permission to render React Components</Authorized>
      ```

`authority`: User's current permissions.
  - `string | number | symbol`, eg: `'admin'` | `1001` | `Symbol()`
  - `Array<string | number | symbol>`, eg: `['admin', 1001, Symbol()]`

**Note**: As long as permissions and authority are [intersection](https://en.wikipedia.org/wiki/Intersection), you can pass authorization. eg:

```javascript
// pass authorization
<Authorized
  permissions={['admin', 1001]}
  authority="admin" // ['admin']
>Authorize permission to render React Components</Authorized>

<Authorized
  permissions={['admin', 1001]}
  authority={[1001]}
>Authorize permission to render React Components</Authorized>

<Authorized
  permissions="admin" // ['admin']
  authority={['admin', 1001]}
>Authorize permission to render React Components</Authorized>

<Authorized
  permissions="admin" // ['admin']
  authority="admin" // ['admin']
>Authorize permission to render React Components</Authorized>
```

`children`: Pass authorization rendering components.
  - `React.ReactElement | null`, eg: `<div>Pass authorization</div>`

`unauthorized`: Components rendered without permission.
  - `React.ReactElement | null`, eg: `<div>Unauthorized</div>`

`loading`: Rendering loading components when permissions is Promise and the status is pending.
  - `React.ReactElement | null`, eg: `<div>Loading...</div>`

#### Example
In the example below, we will use React Router and `Authorized` components at the same time.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import {
  Switch,
  Route,
  Link,
  Redirect,
  BrowserRouter as Router,
} from 'react-router-dom';
import {Authorized} from "react-authorize";

const NotFound = () => (
  <div>404</div>
);

const One = () => <div>This is one</div>;

const Two = () => <div>This is two</div>;

const AuthorizedRoute = ({
  component: Component,
  render,
  permissions,
  authority,
  redirectPath,
  ...rest
}) => (
  <Authorized
    permissions={permissions}
    authority={authority}
    unauthorized={(
      <Route
        {...rest}
        render={() => <Redirect to={{ pathname: redirectPath }} />}
      />
    )}
  >
    <Route
      {...rest}
      render={props => Component ? <Component {...props} /> : render(props)}
    />
  </Authorized>
);

const App = () => (
  <div>
    <ul>
      <li>
        <Link to="/one">The One components does not have permission</Link>
      </li>
      <li>
        <Link to="/two">The Two components have permission</Link>
      </li>
    </ul>

    <div>
      <Switch>
        <AuthorizedRoute
          permissions="admin"
          authority="user"
          redirectPath="/404"
          path="/one"
          component={One}
        />
        <AuthorizedRoute
          permissions="user"
          authority="user"
          path="/two"
          component={Two}
        />
        <Route path="/404" component={NotFound} />
      </Switch>
    </div>
  </div>
);

ReactDOM.render(
  (
    <Router>
      <App />
    </Router>
  ),
  document.getElementById('root'),
);
```


### `secured`
The `secured` function allows us to wrap the component in an annotated way and verify that it is authorized.

#### Parameters
The `secured` function receives an object as a parameter, the properties of the object are the same as the props of the `Authorized` component, but `children` property are replaced by the wrapped components.

```javascript
@secured({
  permissions,
  authority,
  unauthorized,
  loading,
})
class Children extends React.Components {
  render() {
    return (
      <div>This is test</div>
    );
  }
}

// or
secured({
  permissions,
  authority,
  unauthorized,
  loading,
})(
  // This is the children property
  () => <div>This is test</div>
);
```

#### Example
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import {secured} from "react-authorize";

const Unauthorized = () => (
  <div>Render the current component if it is not authorized</div>
);

@secured({
  permissions: 'admin',
  authority: 'admin',
  unauthorized: <Unauthorized />,
})
class Children extends React.Component {
  render() {
    return (
      <div>Authorize permission to render React Components</div>
    );
  }
}

ReactDOM.render(
  (
    <div>
      <Children />
    </div>
  ),
  document.getElementById('root'),
);
```

### `check`
The `check` function is a functional form of `Authorized` components.

#### Parameters
The `check` function receives an object as a parameter, the properties of the object are the same as the props of the `Authorized` component.

```javascript
check({
  permissions,
  authority,
  children,
  unauthorized,
  loading,
});
```

#### Returns
The return value type of `check` function is `React.ReactElement`.

#### Example
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import {check} from "react-authorize";

const Unauthorized = () => (
  <div>Render the current component if it is not authorized</div>
);

// Return react element
const component = check({
  permissions: 'admin',
  authority: 'admin',
  unauthorized: <Unauthorized />,
  children: <div>Authorize permission to render React Components</div>,
});

ReactDOM.render(
  (
    <div>
      {component}
    </div>
  ),
  document.getElementById('root'),
);
```


### `renderAuthorized`
Sometimes we might want to set some parameters in advance, we can do it with the `renderAuthorized` function.

#### Parameters
The `renderAuthorized` function receives an object as a parameter, the properties of the object are the same as the props of the `Authorized` component.

#### Returns
The `renderAuthorized` function has three return values, which are `check`, `secured` and `Authorized`.

#### Example
```javascript
import {renderAuthorized} from "react-authorize";

const {check, secured, Authorized} = renderAuthorized({
  permissions: 'admin',
  unauthorized: <Unauthorized />,
});
```


## Changelog
Changes are tracked in the [CHANGELOG.md](https://github.com/Sam618/react-authorize/blob/master/CHANGELOG.md).


## License
react-authorize is available under the [MIT](https://github.com/Sam618/react-authorize/blob/master/LICENSE) License.
