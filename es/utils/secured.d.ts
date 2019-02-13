import * as React from 'react';
import { IOptions } from '../interface';
export declare function secured<T = {}>(options: IOptions): (Component: React.FunctionComponent<T> | React.ComponentClass<T, any>) => (props: T) => JSX.Element;
