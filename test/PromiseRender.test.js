import React from 'react';
import {shallow} from 'enzyme';
import PromiseRender from '../src/components/PromiseRender';

const Children = 'children';
const Unauthorized = 'unauthorized';
const Loading = 'loading';
const promise = new Promise(resolve => {
  setTimeout(() => resolve(), 1000);
});

function setup(promise) {
  const props = {
    promise,
    children: Children,
    unauthorized: Unauthorized,
    pending: Loading,
  };
  const wrapper = shallow(<PromiseRender {...props} />);
  return {
    props,
    wrapper,
  };
}

describe('PromiseRender', () => {
  it('if loading, render Loading componments', () => {
    const {wrapper} = setup(promise);
    expect(wrapper.text()).toBe(Loading);
  });

  it('if loaded, and promise status is resolved, render Children componments', () => {
    const {wrapper} = setup(promise);
    return promise.then(() => {
      expect(wrapper.text()).toBe(Children);
    });
  });

  it('if loaded, and promise status is rejected, render Unauthorized componments', () => {
    const {wrapper} = setup(promise);
    return promise.catch(() => {
      expect(wrapper.text()).toBe(Unauthorized);
    });
  });
});
