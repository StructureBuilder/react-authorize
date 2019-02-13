import * as React from 'react';
import Authorized from '../components/Authorized';
import {IOptions} from '../interface';

export function secured<T = {}>(options: IOptions) {
  return (Component: React.SFC<T> | React.ComponentClass<T>) => (props: T) => (
    <Authorized
      {...options}
    >
      <Component {...props} />
    </Authorized>
  );
}
