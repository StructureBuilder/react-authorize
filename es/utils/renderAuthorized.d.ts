import * as React from 'react';
import { IOptions } from '../interface';
export declare function renderAuthorized(options: IOptions): {
    Authorized: (props: IOptions) => JSX.Element;
    secured: (otherOptions: IOptions) => (Component: React.FunctionComponent<{}> | React.ComponentClass<{}, any>) => (props: {}) => JSX.Element;
};
