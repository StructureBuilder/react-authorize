var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
/**
 * Render promise component
 *
 * @export
 * @class PromiseRender
 * @extends {React.PureComponent}
 */
var PromiseRender = /** @class */ (function (_super) {
    __extends(PromiseRender, _super);
    function PromiseRender() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            component: null,
            loaded: false,
        };
        return _this;
    }
    // Load components are also displayed when updating
    PromiseRender.getDerivedStateFromProps = function (_, _a) {
        var component = _a.component, loaded = _a.loaded;
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
    };
    PromiseRender.prototype.componentDidMount = function () {
        this.setRender();
    };
    PromiseRender.prototype.componentDidUpdate = function () {
        this.setRender();
    };
    PromiseRender.prototype.setRender = function () {
        var _this = this;
        var _a = this.props, promise = _a.promise, children = _a.children, unauthorized = _a.unauthorized;
        var _b = this.state, component = _b.component, loaded = _b.loaded;
        if (component && loaded) {
            return;
        }
        promise
            .then(function () { return _this.setState({ component: children }); })
            .catch(function () { return _this.setState({ component: unauthorized }); });
    };
    PromiseRender.prototype.render = function () {
        var _a = this.state, component = _a.component, loaded = _a.loaded;
        var pending = this.props.pending;
        return (React.createElement(React.Fragment, null, loaded ? component : pending));
    };
    return PromiseRender;
}(React.PureComponent));
export default PromiseRender;
