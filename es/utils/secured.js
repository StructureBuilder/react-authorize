var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from 'react';
import Authorized from '../components/Authorized';
export function secured(options) {
    return function (Component) { return function (props) { return (React.createElement(Authorized, __assign({}, options),
        React.createElement(Component, __assign({}, props)))); }; };
}
