import * as React from 'react';
import PromiseRender from '../components/PromiseRender';
import { warn, isPromise, } from './index';
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
export function checkPermissions(_a) {
    var permissions = _a.permissions, authority = _a.authority, _b = _a.children, children = _b === void 0 ? null : _b, _c = _a.unauthorized, unauthorized = _c === void 0 ? null : _c, _d = _a.loading, loading = _d === void 0 ? null : _d;
    if (isPromise(permissions)) {
        return (React.createElement(PromiseRender, { promise: permissions, pending: loading, unauthorized: unauthorized }, children));
    }
    if (typeof permissions === 'function') {
        var bool = permissions(authority);
        // Function -> Promise
        if (isPromise(bool)) {
            return (React.createElement(PromiseRender, { promise: bool, pending: loading, unauthorized: unauthorized }, children));
        }
        return bool ? children : unauthorized;
    }
    /*
     * permissions = [] Satisfying one of the permissions
     * authority = []
     */
    if (Array.isArray(permissions)) {
        if (Array.isArray(authority)) {
            for (var _i = 0, authority_1 = authority; _i < authority_1.length; _i++) {
                var value = authority_1[_i];
                if (permissions.indexOf(value) !== -1) {
                    return children;
                }
            }
            /*
            * permissions = [] Satisfying one of the permissions
            * authority = string
            */
        }
        else if (permissions.indexOf(authority) !== -1) {
            return children;
        }
        return unauthorized;
    }
    var type = typeof permissions;
    if (type === 'string' ||
        type === 'number' ||
        type === 'symbol') {
        /*
         * permissions = string
         * authority = [] Satisfying one of the permissions
         */
        if ((Array.isArray(authority) && authority.indexOf(permissions) !== -1) ||
            permissions === authority) {
            return children;
        }
        return unauthorized;
    }
    warn('[react-authorize]: Unsupported parameters. \n' +
        'permissions support {Array<string | number | symbol> | string | number | symbol | Promise | (authority => boolean | Promise)} parameter. \n' +
        'authority support {string | number | symbol} parameter.');
    return null;
}
