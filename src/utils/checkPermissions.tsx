import * as React from 'react';
import {IOptions} from '../interface';
import PromiseRender from '../components/PromiseRender';
import {
  warn,
  isPromise,
} from './index';

/**
 * Check permissions
 *
 * @param {IOptions} {
 *     type Authority = string | number | symbol | Array<string | number | symbol>
 *     type Permissions = Authority | Promise | (authority => boolean | Promise)
 *     {Permissions}                    permissions,  Permission judgment.
 *     {Authority}                      authority,    Your permission description.
 *     {React.ReactElement<any> | null} children,     Passing components.
 *     {React.ReactElement<any> | null} unauthorized, No pass components.
 *     {React.ReactElement<any> | null} loading,      Loading.
 *   }
 * @returns {React.ReactNode}
 */
export function checkPermissions(
  {
    permissions,
    authority,
    children = null,
    unauthorized = null,
    loading = null,
  }: IOptions,
): React.ReactElement<any> | null {
  if (isPromise(permissions)) {
    return (
      <PromiseRender
        promise={permissions}
        pending={loading}
        unauthorized={unauthorized}
      >{children}</PromiseRender>
    );
  }

  if (typeof permissions === 'function') {
    const bool = permissions(authority);

    // Function -> Promise
    if (isPromise(bool)) {
      return (
        <PromiseRender
          promise={bool}
          pending={loading}
          unauthorized={unauthorized}
        >{children}</PromiseRender>
      );
    }
    return bool ? children : unauthorized;
  }

  const type = typeof permissions;

  if (
    type === 'string' ||
    type === 'number' ||
    type === 'symbol' ||
    Array.isArray(permissions)
  ) {
    /*
     * Intersection
     * permissions = [] Satisfying one of the permissions
     * authority = []
     */
    if (!Array.isArray(permissions)) {
      permissions = [permissions];
    }

    if (!Array.isArray(authority)) {
      authority = [authority];
    }

    for (const value of authority) {
      if (permissions.indexOf(value) !== -1) {
        return children;
      }
    }

    return unauthorized;
  }

  warn(
    '[react-authorize]: Unsupported parameters. \n' +
    'permissions support {Array<string | number | symbol> | string | number | symbol | Promise | (authority => boolean | Promise)} parameter. \n' +
    'authority support {Array<string | number | symbol> | string | number | symbol} parameter.'
  );

  return null;
}
