import * as React from 'react';
interface IPromiseRenderProps {
    pending: React.ReactNode;
    promise: Promise<any>;
    unauthorized: React.ReactNode;
}
interface IPromiseRenderState {
    component: React.ReactNode | null;
    loaded: boolean;
}
/**
 * Render promise component
 *
 * @export
 * @class PromiseRender
 * @extends {React.PureComponent}
 */
export default class PromiseRender extends React.PureComponent<IPromiseRenderProps, IPromiseRenderState> {
    state: {
        component: null;
        loaded: boolean;
    };
    static getDerivedStateFromProps(_: IPromiseRenderProps, { component, loaded }: IPromiseRenderState): {
        component: undefined;
        loaded: boolean;
    } | {
        loaded: boolean;
        component?: undefined;
    } | null;
    componentDidMount(): void;
    componentDidUpdate(): void;
    private setRender;
    render(): JSX.Element;
}
export {};
