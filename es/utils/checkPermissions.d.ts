import * as React from 'react';
import { IOptions } from '../interface';
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
export declare function checkPermissions({ permissions, authority, children, unauthorized, loading, }: IOptions): React.ReactElement<any> | null;
