import * as React from 'react';
import Authorized from '../components/Authorized';
import {secured} from './index';
import {IOptions} from '../interface';
import { check } from './check';

/**
 * Generate a permission component with configuration
 *
 * @export
 * @param {IOptions} options
 * @returns
 */
export function renderAuthorized(options: IOptions) {
  return {
    Authorized: (props: IOptions) => (
      <Authorized
        {...options}
        {...props}
      />
    ),
    secured: (otherOptions: IOptions) => secured({
      ...options,
      ...otherOptions,
    }),
    check: (otherOptions: IOptions) => check({
      ...options,
      ...otherOptions,
    }),
  };
}
