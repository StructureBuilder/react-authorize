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
  public state = {
    component: null,
    loaded: false,
  };

  // Load components are also displayed when updating
  public static getDerivedStateFromProps(_: IPromiseRenderProps, {component, loaded}: IPromiseRenderState) {
    if (component && loaded) {
      return {
        component: undefined,
        loaded: false,
      };
    }

    if (component && !loaded) {
      return {
        loaded: true,
      };
    }

    return null;
  }

  public componentDidMount() {
    this.setRender();
  }

  public componentDidUpdate() {
    this.setRender();
  }

  private setRender() {
    const {
      promise,
      children,
      unauthorized,
    } = this.props;
    const {
      component,
      loaded,
    } = this.state;

    if (component && loaded) {
      return;
    }

    promise
      .then(() => this.setState({component: children}))
      .catch(() => this.setState({component: unauthorized}));
  }

  public render() {
    const {
      component,
      loaded,
    }  = this.state;
    const {
      pending,
    } = this.props;
    return loaded ? component : pending;
  }
}
