import * as React from 'react';
export * from './debug';
export * from './checkPermissions';
export * from './secured';
export * from './renderAuthorized';
/**
 * Is promise
 *
 * @param {*} promise
 * @returns {promise is Promise<any>}
 */
export declare const isPromise: (promise: any) => promise is Promise<any>;
/**
 * Check is VNode, if not, return VNode as well.
 *
 * @param {*} Target
 * @returns
 */
export declare function checkIsVNode(Target: any): React.ReactNode;
