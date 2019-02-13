import React, { Component } from 'react';

class Test extends Component {
  componentDidUpdate(props, state) {
    console.log(props, state);
  }

  render() {
    const {number} = this.props;
    return number;
  }
}

export default class Two extends Component {
  state = {
    number: 1,
  };

  render() {
    const {number} = this.state;
    return (
      <div>
        <Test number={number} />
        <button
          onClick={() => this.setState(({ number: n }) => ({ number: n + 1 }))}
        >+</button>
      </div>
    );
  }
}