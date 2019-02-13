import * as React from 'react';
import Authorized from '../components/Authorized';
import {secured} from './index';
import {IOptions} from '../interface';

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
  };
}
