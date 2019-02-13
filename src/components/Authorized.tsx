import * as React from 'react';
import {
  checkPermissions,
} from '../utils';
import {IOptions} from '../interface';

const Authorized: React.SFC<IOptions> = props => checkPermissions(props);

export default Authorized;
