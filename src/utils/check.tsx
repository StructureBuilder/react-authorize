import * as React from 'react';
import Authorized from '../components/Authorized';
import {IOptions} from '../interface';

/**
 * Authorized form of function
 *
 * @export
 * @param {IOptions} options
 * @returns
 */
export function check(options: IOptions): React.ReactElement<any> {
  const {children} = options;
  return (
    <Authorized
      {...options}
    >
      {children}
    </Authorized>
  );
}
